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
    let message = '';
    let showGallery = false;

    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const [galleryDivWidth, setGalleryDivWidth] = useState(0);

    const { error, data: galleryData } = useGalleryList(path, maxImagesToLoad);

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

    if (galleryData && galleryDivWidth) {
        showGallery = true;
    } else if (error) {
        message = 'There has been an ERROR';
    } else {
        message = 'Loading Images';
    }

    return (
        <div className="galleryContainer">
            <div ref={widthRef} className="justifiedGallery">
                {message}
                {showGallery && (
                    <GalleryContent
                        path={path}
                        title={title}
                        galleryData={galleryData as GalleryData}
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
