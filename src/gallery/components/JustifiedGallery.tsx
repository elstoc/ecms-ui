import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { useNthElementIsVisible, useScrollToNthElement } from '../../common/hooks';
import { GalleryThumb } from './GalleryThumb';
import { GalleryStateContext } from './Gallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

import './JustifiedGallery.css';

export const JustifiedGallery: FC = (): ReactElement => {
    const { galleryState: { apiPath, maxImages, marginPx, activeImageIndex }, galleryStateReducer } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(apiPath, maxImages);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth ?? 0, marginPx);
    }, [images, galleryDivWidth, marginPx]);

    const galleryThumbs = images.map((image, index) => (
        <GalleryThumb
            key={image.fileName}
            fileName={image.fileName}
            description={image.description}
            thumbSrcUrl={image.thumbSrcUrl}
            widthPx={Math.trunc(image.thumbDimensions.width * resizeRatios[index])}
            heightPx={Math.trunc(image.thumbDimensions.height * resizeRatios[index])}
        />
    ));

    const loadMoreImages = useCallback(() => (
        galleryStateReducer({ action: 'incrementMaxImages', maximum: allImageFiles.length })
    ), [allImageFiles, galleryStateReducer]);

    useNthElementIsVisible(galleryThumbs, images.length - 1, loadMoreImages);
    useScrollToNthElement(galleryThumbs, activeImageIndex);

    return (
        <div ref={widthRef} className="justified-gallery">
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
