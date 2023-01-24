import React, { FC, ReactElement, createRef } from 'react';
import { useParams } from 'react-router-dom';

import { useIsVisible } from '../../hooks/useIsVisible';
import { GalleryThumb } from './GalleryThumb';
import { LightBox } from './LightBox';
import './Gallery.css';
import { GalleryData, ImageData } from '../../types/Gallery';

export type GalleryContentProps = {
    galleryData: GalleryData;
    galleryDivWidth: number;
    loadMoreImages: () => void;
    marginPx: number;
    threshold: number;
}

export const GalleryContent: FC<GalleryContentProps> = ({ galleryData, galleryDivWidth, loadMoreImages, marginPx, threshold }): ReactElement => {
    const { imageName } = useParams();
    const refTriggerLoadWhenVisible = createRef<HTMLImageElement>();

    useIsVisible(refTriggerLoadWhenVisible, loadMoreImages);

    const resizeRatios = getResizeRatios(galleryData.imageList, galleryDivWidth, marginPx);

    return (
        <>
            {imageName &&
                <LightBox
                    imageName={imageName}
                    galleryData={galleryData}
                    loadMoreImages={loadMoreImages}
                />
            }
            {galleryData.imageList.map((image, index) =>
                <GalleryThumb
                    key={image.fileName}
                    fileName={image.fileName}
                    description={image.description}
                    srcUrl={image.thumbSrcUrl}
                    widthPx={Math.trunc(image.thumbDimensions.width * (resizeRatios[index] || 1))}
                    heightPx={Math.trunc(image.thumbDimensions.height * (resizeRatios[index] || 1))}
                    marginPx={marginPx}
                    ref={
                        index === galleryData.imageList.length - threshold
                            ? refTriggerLoadWhenVisible
                            : null
                    }
                />
            )}
        </>
    );
};

const getResizeRatios = (imageList: ImageData[], divWidth: number, marginPx: number): number[] => {
    let nextRowWidthOfThumbs = 0;
    let nextRowImageCount = 0;
    const ratios: number[] = [];

    imageList.forEach((image) => {
        nextRowImageCount++;
        nextRowWidthOfThumbs += image.thumbDimensions.width;
        const widthAvailableForThumbs = divWidth - (2 * marginPx * nextRowImageCount);

        if (nextRowWidthOfThumbs >= widthAvailableForThumbs) {
            const resizeRatio = widthAvailableForThumbs / nextRowWidthOfThumbs;
            ratios.push(...Array(nextRowImageCount).fill(resizeRatio));
            nextRowWidthOfThumbs = 0;
            nextRowImageCount = 0;
        }
    });

    return ratios;
};
