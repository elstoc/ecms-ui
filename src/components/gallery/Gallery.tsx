import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useGalleryList } from '../../hooks/galleryQueries';
import { GalleryContent } from './GalleryContent';
import './Gallery.css';
import { Route, Routes } from 'react-router';

export type GalleryProps = {
    apiPath: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

export const Gallery: FC<GalleryProps> = ({ title, apiPath, marginPx, batchSize, threshold }): ReactElement => {
    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const { isLoading, isError, data: galleryImages } = useGalleryList(apiPath, maxImagesToLoad);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) =>
            prevMaxImages < galleryImages!.imageCount
                ? prevMaxImages + batchSize
                : prevMaxImages
        );
    }, [galleryImages, batchSize]);

    const showGallery = (galleryImages && galleryDivWidth);

    const galleryContent = ( showGallery &&
        <GalleryContent
            title={title}
            galleryImages={galleryImages}
            galleryDivWidth={galleryDivWidth}
            loadMoreImages={loadMoreImages}
            marginPx={marginPx}
            threshold={threshold}
        />
    );

    return (
        <div ref={widthRef} className="gallery">
            <Helmet><title>{title}</title></Helmet>
            {isError && 'There has been an ERROR'}
            {isLoading && 'Loading images'}
            <Routes>
                <Route path=":lightBoxImageName?" element={galleryContent ?? ''} />
            </Routes>
        </div>
    );
};
