import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState } from 'react';

import { useGalleryList } from '../../hooks/galleryQueries';
import { GalleryContent } from './GalleryContent';
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
    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const [galleryDivWidth, setGalleryDivWidth] = useState(0);

    const { isLoading, error, data: galleryData } = useGalleryList(path, maxImagesToLoad);

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) => (prevMaxImages < galleryData!.imageCount) ? (prevMaxImages + batchSize) : prevMaxImages);
    }, [galleryData, batchSize]);

    const onResize = useCallback((width?: number) => (
        width && setGalleryDivWidth(width)
    ), []);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    const showGallery = (galleryData && galleryDivWidth);
    const errorMessage = error ? 'There has been an ERROR' : '';
    const loadingMessage = isLoading ? 'Loading images' : '';

    return (
        <div className="galleryContainer">
            <div ref={widthRef} className="justifiedGallery">
                {errorMessage || loadingMessage}
                {showGallery && (
                    <GalleryContent
                        galleryData={galleryData}
                        galleryDivWidth={galleryDivWidth}
                        loadMoreImages={loadMoreImages}
                        marginPx={marginPx}
                        threshold={threshold}
                    />
                )}
            </div>
        </div>
    );
};
