import React, { FC, ReactElement, useMemo } from 'react';

import { useNthElementIsVisible } from '../../hooks/useNthElementIsVisible';
import { useScrollToNthElement } from '../../hooks/useScrollToNthElement';
import { GalleryThumb } from './GalleryThumb';
import { GalleryContents } from '../../types/Gallery';
import './GalleryContent.css';

export type GalleryContentProps = {
    galleryContent: GalleryContents;
    galleryDivWidth: number;
    loadMoreImages: () => void;
    marginPx: number;
    threshold: number;
    lightBoxImageIndex: number;
}

export const GalleryContent: FC<GalleryContentProps> = (props): ReactElement => {
    const { galleryContent, galleryDivWidth, loadMoreImages, marginPx, threshold, lightBoxImageIndex } = props;
    const { images } = galleryContent;
    
    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth, marginPx);
    }, [images, galleryDivWidth, marginPx]);

    const galleryThumbs = images.map((image, index) => (
        <GalleryThumb
            key={image.fileName}
            fileName={image.fileName}
            description={image.description}
            thumbSrcUrl={image.thumbSrcUrl}
            marginPx={marginPx}
            widthPx={Math.trunc(image.thumbDimensions.width * resizeRatios[index])}
            heightPx={Math.trunc(image.thumbDimensions.height * resizeRatios[index])}
        />
    ));

    useNthElementIsVisible(galleryThumbs, images.length - threshold, loadMoreImages);
    useScrollToNthElement(galleryThumbs, lightBoxImageIndex);

    return (
        <div className="gallery-content">
            {galleryThumbs}
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
