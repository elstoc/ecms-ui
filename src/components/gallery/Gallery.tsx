import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router';
import { useResizeDetector } from 'react-resize-detector';
import { Helmet } from 'react-helmet';

import { HandleQueryState } from '../utils/HandleQueryState';
import { useGalleryContents } from '../../hooks/useApiQueries';
import { GalleryContent } from './GalleryContent';
import './Gallery.css';
import { GalleryLightBox } from './GalleryLightBox';

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
    const { images, allImageFiles } = galleryContent ?? {};

    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    const loadMoreImages = useCallback((minimum?: number) => {
        setMaxImagesToLoad((prevMaxImages) =>
            prevMaxImages < (allImageFiles?.length ?? 0)
                ? Math.max(prevMaxImages, minimum ?? 0) + batchSize
                : prevMaxImages
        );
    }, [allImageFiles, batchSize]);

    useEffect(() => {
        if ( images && allImageFiles
             && lightBoxImageIndex >= (images.length - 2) 
             && images.length < allImageFiles.length
        ) {
            loadMoreImages(lightBoxImageIndex);
        }
    }, [images, allImageFiles, loadMoreImages, lightBoxImageIndex]);

    if (galleryContent?.images && lightBoxImageName && lightBoxImageIndex < 0) {
        return <Navigate to='..' replace={true} />;
    }

    return (
        <div ref={widthRef} className="gallery">
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                <GalleryLightBox
                    parentTitle={title}
                    currImage={images?.[lightBoxImageIndex]}
                    nextImage={images?.[lightBoxImageIndex + 1]}
                    prevImage={images?.[lightBoxImageIndex - 1]}
                />
                <GalleryContent
                    galleryContent={galleryContent!}
                    galleryDivWidth={galleryDivWidth!}
                    loadMoreImages={loadMoreImages}
                    marginPx={marginPx}
                    threshold={threshold}
                    lightBoxImageIndex={lightBoxImageIndex}
                />
            </HandleQueryState>
        </div>
    );
};
