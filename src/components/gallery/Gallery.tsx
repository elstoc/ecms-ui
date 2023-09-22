import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';

import { HandleQueryState } from '../utils/HandleQueryState';
import { useGalleryContents } from '../../hooks/useApiQueries';
import { GalleryContent } from './GalleryContent';
import './Gallery.css';
import { Route, Routes, useParams } from 'react-router';

export type GalleryProps = {
    apiPath: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

export const Gallery: FC<GalleryProps> = (props): ReactElement => {
    return (
        <Routes>
            <Route path=":lightBoxImageName?" element={<RoutedGallery {...props} />} />
        </Routes>
    );
};

const RoutedGallery: FC<GalleryProps> = ({ title, apiPath, marginPx, batchSize, threshold }): ReactElement => {
    const { lightBoxImageName } = useParams();
    const [ maxImagesToLoad, setMaxImagesToLoad ] = useState(batchSize);
    const [ queryState, galleryContent ] = useGalleryContents(apiPath, maxImagesToLoad);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) =>
            prevMaxImages < galleryContent!.imageCount
                ? prevMaxImages + batchSize
                : prevMaxImages
        );
    }, [galleryContent, batchSize]);

    return (
        <div ref={widthRef} className="gallery">
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                <GalleryContent
                    title={title}
                    galleryContent={galleryContent!}
                    galleryDivWidth={galleryDivWidth!}
                    loadMoreImages={loadMoreImages}
                    marginPx={marginPx}
                    threshold={threshold}
                    lightBoxImageName={lightBoxImageName}
                />
            </HandleQueryState>
        </div>
    );
};
