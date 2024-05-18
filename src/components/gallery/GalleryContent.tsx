import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import { Helmet } from 'react-helmet';

import { HandleQueryState } from '../utils/HandleQueryState';
import { useGalleryContents } from '../../hooks/useApiQueries';
import { JustifiedGallery } from './JustifiedGallery';
import './GalleryContent.css';
import { GalleryLightBox } from './GalleryLightBox';

export type GalleryContentProps = {
    apiPath: string;
    title: string;
    marginPx: number;
    batchSize: number;
}

export const GalleryContent: FC<GalleryContentProps> = ({ title, apiPath, marginPx, batchSize }): ReactElement => {
    const [searchParams] = useSearchParams();
    const lightBoxImageName = searchParams.get('file');
    const [ maxImagesToLoad, setMaxImagesToLoad ] = useState(batchSize);
    const [ queryState, galleryContent ] = useGalleryContents(apiPath, maxImagesToLoad);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });
    const { images, allImageFiles } = galleryContent ?? {};

    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    // TODO: Move to context so that LightBox and Gallery can update independently
    const loadMoreImages = useCallback((minimum?: number) => {
        setMaxImagesToLoad((prevMaxImages) =>
            prevMaxImages < (allImageFiles?.length ?? 0)
                ? Math.max(prevMaxImages, minimum ?? 0) + batchSize
                : prevMaxImages
        );
    }, [allImageFiles, batchSize]);

    // TODO: Move to LightBox component once
    //       (a) maxImages is in global context
    //       (b) useQuery uses Suspense and error boundary (GalleryBoundary component?)
    useEffect(() => {
        if ( images && allImageFiles
             && lightBoxImageIndex >= (images.length - 2) 
             && images.length < allImageFiles.length
        ) {
            loadMoreImages(lightBoxImageIndex);
        }
    }, [images, allImageFiles, loadMoreImages, lightBoxImageIndex]);

    // TODO: Move to LightBox component
    if (galleryContent?.images && lightBoxImageName && lightBoxImageIndex < 0) {
        return <Navigate to='..' replace={true} />;
    }

    return (
        <div ref={widthRef} className="gallery-content">
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                <GalleryLightBox
                    parentTitle={title}
                    currImage={images?.[lightBoxImageIndex]}
                    nextImage={images?.[lightBoxImageIndex + 1]}
                    prevImage={images?.[lightBoxImageIndex - 1]}
                />
                <JustifiedGallery
                    galleryContent={galleryContent!}
                    galleryDivWidth={galleryDivWidth!}
                    loadMoreImages={loadMoreImages}
                    marginPx={marginPx}
                    lightBoxImageIndex={lightBoxImageIndex}
                />
            </HandleQueryState>
        </div>
    );
};
