import React, { FC, ReactElement, createRef, useMemo } from 'react';

import { useElementIsVisible } from '../../hooks/useElementIsVisible';
import { GalleryThumb } from './GalleryThumb';
import { LightBox } from './LightBox';
import { GalleryContents } from '../../types/Gallery';
import './GalleryContent.css';

export type GalleryContentProps = {
    title: string;
    galleryContent: GalleryContents;
    galleryDivWidth: number;
    loadMoreImages: () => void;
    marginPx: number;
    threshold: number;
    lightBoxImageIndex: number;
}

export const GalleryContent: FC<GalleryContentProps> = (props): ReactElement => {
    const { title, galleryContent, galleryDivWidth, loadMoreImages, marginPx, threshold, lightBoxImageIndex } = props;
    const { images } = galleryContent;

    const refTriggerLoadWhenVisible = createRef<HTMLAnchorElement>();
    useElementIsVisible(refTriggerLoadWhenVisible, loadMoreImages);

    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth, marginPx);
    }, [images, galleryDivWidth, marginPx]);

    return (
        <div className="gallery-content">
            {images[lightBoxImageIndex] &&
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
        </div>
    );
};

const getResizeRatios = (thumbWidths: number[], divWidth: number, marginPx: number): number[] => {
    let nextRowWidthOfThumbs = 0,
        nextRowImageCount = 0;
    const resizeRatios: number[] = [];

    thumbWidths.forEach((thumbWidth) => {
        nextRowImageCount++;
        nextRowWidthOfThumbs += thumbWidth;
        const widthAvailableForThumbs = divWidth - (2 * marginPx * nextRowImageCount);

        if (nextRowWidthOfThumbs >= widthAvailableForThumbs) {
            const resizeRatio = widthAvailableForThumbs / nextRowWidthOfThumbs;
            resizeRatios.push(...Array(nextRowImageCount).fill(resizeRatio));
            nextRowWidthOfThumbs = nextRowImageCount = 0;
        }
    });

    if (thumbWidths.length > resizeRatios.length) {
        resizeRatios.push(...Array(nextRowImageCount).fill(1));
    }

    return resizeRatios;
};
