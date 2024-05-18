import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';

import { useNthElementIsVisible } from '../../hooks/useNthElementIsVisible';
import { useScrollToNthElement } from '../../hooks/useScrollToNthElement';
import { GalleryThumb } from './GalleryThumb';
import { GalleryContents } from '../../types/Gallery';
import './JustifiedGallery.css';
import { MaxImagesContext } from './Gallery';

export type JustifiedGalleryProps = {
    galleryContent: GalleryContents;
    galleryDivWidth: number;
    marginPx: number;
    lightBoxImageIndex: number;
}

export const JustifiedGallery: FC<JustifiedGalleryProps> = (props): ReactElement => {
    const { setMaxImages } = useContext(MaxImagesContext);
    const { galleryContent, galleryDivWidth, marginPx, lightBoxImageIndex } = props;
    const { images, allImageFiles } = galleryContent;
    
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

    // TODO: Decide whether to make batchsize parameterised
    const loadMoreImages = useCallback(() => {
        setMaxImages?.((prevMax) =>
            (prevMax < allImageFiles.length) ? (prevMax + 50) : allImageFiles.length
        );
    }, [allImageFiles, setMaxImages]);

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
