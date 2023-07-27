import React, { FC, ReactElement, createRef, useMemo, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useIsVisible } from '../../hooks/useIsVisible';
import { GalleryThumb } from './GalleryThumb';
import { LightBox } from './LightBox';
import './Gallery.css';
import { GalleryImages } from '../../types/Gallery';

export type GalleryContentProps = {
    title: string;
    galleryImages: GalleryImages;
    galleryDivWidth: number;
    loadMoreImages: () => void;
    marginPx: number;
    threshold: number;
}

export const GalleryContent: FC<GalleryContentProps> = ({ title, galleryImages, galleryDivWidth, loadMoreImages, marginPx, threshold }): ReactElement => {
    const { lightBoxImageName } = useParams();
    const { images, imageCount } = galleryImages;

    const lightBoxImageIndex = images.findIndex((image) => image.fileName === lightBoxImageName);

    const refTriggerLoadWhenVisible = createRef<HTMLImageElement>();
    useIsVisible(refTriggerLoadWhenVisible, loadMoreImages);

    useEffect(() => {
        if (lightBoxImageIndex >= (images.length - 2) && images.length < imageCount) {
            loadMoreImages();
        }
    }, [images, imageCount, lightBoxImageIndex, loadMoreImages]);

    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth, marginPx);
    }, [images, galleryDivWidth, marginPx]);

    if (lightBoxImageName && lightBoxImageIndex < 0) {
        return <Navigate to='..' replace={true} />;
    }

    return (
        <>
            {lightBoxImageName &&
                <LightBox
                    parentTitle={title}
                    currImage={images[lightBoxImageIndex]}
                    nextImage={images[lightBoxImageIndex + 1]}
                    prevImage={images[lightBoxImageIndex - 1]}
                />
            }
            {images.map((image, index) =>
                <GalleryThumb
                    key={image.fileName}
                    fileName={image.fileName}
                    description={image.description}
                    srcUrl={image.thumbSrcUrl}
                    widthPx={Math.trunc(image.thumbDimensions.width * resizeRatios[index])}
                    heightPx={Math.trunc(image.thumbDimensions.height * resizeRatios[index])}
                    marginPx={marginPx}
                    ref={
                        index === images.length - threshold
                            ? refTriggerLoadWhenVisible
                            : null
                    }
                />
            )}
        </>
    );
};

const getResizeRatios = (widths: number[], divWidth: number, marginPx: number): number[] => {
    let nextRowWidthOfThumbs = 0,
        nextRowImageCount = 0;
    const ratios: number[] = [];

    widths.forEach((width) => {
        nextRowImageCount++;
        nextRowWidthOfThumbs += width;
        const widthAvailableForThumbs = divWidth - (2 * marginPx * nextRowImageCount);

        if (nextRowWidthOfThumbs >= widthAvailableForThumbs) {
            const resizeRatio = widthAvailableForThumbs / nextRowWidthOfThumbs;
            ratios.push(...Array(nextRowImageCount).fill(resizeRatio));
            nextRowWidthOfThumbs = nextRowImageCount = 0;
        }
    });

    if (widths.length > ratios.length) {
        ratios.push(...Array(nextRowImageCount).fill(1));
    }

    return ratios;
};
