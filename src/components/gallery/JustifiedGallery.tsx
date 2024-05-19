import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';

import { useNthElementIsVisible } from '../../hooks/useNthElementIsVisible';
import { useScrollToNthElement } from '../../hooks/useScrollToNthElement';
import { GalleryThumb } from './GalleryThumb';
import { GalleryContents } from '../../types/Gallery';
import './JustifiedGallery.css';
import { GalleryStateContext } from './Gallery';

export type JustifiedGalleryProps = {
    galleryContent: GalleryContents;
    galleryDivWidth: number;
    lightBoxImageIndex: number;
}

export const JustifiedGallery: FC<JustifiedGalleryProps> = (props): ReactElement => {
    const { galleryState, alterGalleryState } = useContext(GalleryStateContext);
    const { galleryContent, galleryDivWidth, lightBoxImageIndex } = props;
    const { images, allImageFiles } = galleryContent;
    
    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth, galleryState.marginPx);
    }, [images, galleryDivWidth, galleryState.marginPx]);

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

    // TODO: Decide whether to make batchsize parameterised
    const loadMoreImages = useCallback(() => {
        alterGalleryState?.({ action: 'incrementMaxImages', maximum: allImageFiles.length });
    }, [allImageFiles, alterGalleryState]);

    useNthElementIsVisible(galleryThumbs, images.length -1, loadMoreImages);
    useScrollToNthElement(galleryThumbs, lightBoxImageIndex);

    return (
        <div className="justified-gallery">
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
