import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState, createRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useIsVisible } from '../../hooks/useIsVisible';
import { useGalleryList } from '../../hooks/galleryQueries';
import { GalleryThumb } from './GalleryThumb';
import { LightBox } from './LightBox';
import './Gallery.css';
import { GalleryData } from '../../types/Gallery';

export type GalleryProps = {
    path: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

export const Gallery: FC<GalleryProps> = ({ path, marginPx, title, batchSize, threshold }): ReactElement => {
    let resizeRatios: number[] = [];
    let message = '';

    const refTriggerLoadWhenVisible = createRef<HTMLImageElement>();
    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const [galleryDivWidth, setGalleryDivWidth] = useState(0);

    const { error, data: galleryData } = useGalleryList(path, maxImagesToLoad);

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) => (prevMaxImages < galleryData!.imageCount) ? (prevMaxImages + batchSize) : prevMaxImages);
    }, [galleryData, batchSize]);

    useIsVisible(refTriggerLoadWhenVisible, loadMoreImages);

    const onResize = useCallback((width?: number) => (
        width && setGalleryDivWidth(width)
    ), []);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (error) {
        message = 'There has been an ERROR';
    } else if (galleryData && galleryDivWidth) {
        resizeRatios = getResizeRatios(galleryData, galleryDivWidth, marginPx);
    } else {
        message = 'Loading Images';
    }

    return (
        <div className="galleryContainer">
            <div ref={widthRef} className="justifiedGallery">
                {message}
                {galleryData && (
                    <Routes>
                        <Route
                            path=":imageName"
                            element={
                                <LightBox
                                    path={path}
                                    galleryData={galleryData}
                                    loadMoreImages={loadMoreImages}
                                />
                            }
                        />
                    </Routes>
                )}
                {galleryData?.imageList?.map((image, index) => (
                    <GalleryThumb
                        key={image.fileName}
                        image={image}
                        title={`${title} - ${image.fileName}`}
                        marginPx={marginPx}
                        resizeRatio={resizeRatios[index] || 1}
                        path={path}
                        ref={
                            index === galleryData.imageList.length - threshold
                                ? refTriggerLoadWhenVisible
                                : null
                        }
                    />
                ))}
            </div>
        </div>
    );
};

const getResizeRatios = (galleryData: GalleryData, divWidth: number, marginPx: number): number[] => {
    let nextRowWidthOfThumbs = 0;
    let nextRowImageCount = 0;
    const ratios: number[] = [];

    galleryData?.imageList?.forEach((image) => {
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
