import React, { FC, ReactElement, createRef, useEffect, useMemo, useState } from 'react';

import { useElementIsVisible } from '../../hooks/useElementIsVisible';
import { GalleryThumb, GalleryThumbProps } from './GalleryThumb';
import { GalleryLightBox } from './GalleryLightBox';
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
    
    const [lastLightBoxImageIndex, setLastLighBoxImageIndex] = useState(-1);
    const refTriggerLoadWhenVisible = createRef<HTMLAnchorElement>();
    const refLastLightBoxImage = createRef<HTMLAnchorElement>();

    useElementIsVisible(refTriggerLoadWhenVisible, loadMoreImages);

    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth, marginPx);
    }, [images, galleryDivWidth, marginPx]);

    const processedImages: GalleryThumbProps[] = useMemo(() => (
        images.map((image, index) => {
            const { fileName, description, thumbSrcUrl } = image;
            const widthPx = Math.trunc(image.thumbDimensions.width * resizeRatios[index]);
            const heightPx = Math.trunc(image.thumbDimensions.height * resizeRatios[index]);

            let ref: React.RefObject<HTMLAnchorElement> | null = null;
            if (index === lastLightBoxImageIndex) {
                ref = refLastLightBoxImage;
            } else if (index === images.length - threshold) {
                ref = refTriggerLoadWhenVisible;
            }

            return { thumbSrcUrl, fileName, description, marginPx, widthPx, heightPx, ref };
        })
    ) , [images, resizeRatios, marginPx, lastLightBoxImageIndex, refLastLightBoxImage, refTriggerLoadWhenVisible, threshold]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const refElement = refLastLightBoxImage.current;
        if (refElement && lightBoxImageIndex === -1) {
            setTimeout(() => {
                refElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 1);
        }
        setLastLighBoxImageIndex(lightBoxImageIndex);
    });

    return (
        <div className="gallery-content">
            {images[lightBoxImageIndex] &&
                <GalleryLightBox
                    parentTitle={title}
                    currImage={images[lightBoxImageIndex]}
                    nextImage={images[lightBoxImageIndex + 1]}
                    prevImage={images[lightBoxImageIndex - 1]}
                />
            }
            {processedImages.map((thumbProps) =>
                <GalleryThumb
                    key={thumbProps.fileName}
                    {...thumbProps}
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
