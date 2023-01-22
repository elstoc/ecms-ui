import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState } from 'react';

import { useGalleryList } from '../../hooks/galleryQueries';
import { GalleryContent } from './GalleryContent';
import './Gallery.css';

export type GalleryProps = {
    path: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

export const Gallery: FC<GalleryProps> = ({ path, marginPx, title, batchSize, threshold }): ReactElement => {
    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const { isLoading, isError, data: galleryData } = useGalleryList(path, maxImagesToLoad);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) =>
            prevMaxImages < galleryData!.imageCount
                ? prevMaxImages + batchSize
                : prevMaxImages
        );
    }, [galleryData, batchSize]);

    const showGallery = (galleryData && galleryDivWidth);

    return (
        <div ref={widthRef} className="galleryContainer">
            <div className="justifiedGallery">
                {isError && 'There has been an ERROR'}
                {isLoading && 'Loading images'}
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
