import React, { FC, ReactElement, useCallback, useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import { Helmet } from 'react-helmet';

import { useGalleryContent } from '../../hooks/useApiQueries';
import { JustifiedGallery } from './JustifiedGallery';
import { MaxImagesContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';
import { GalleryComponentMetadata } from '../../types/Site';

import './GalleryContent.css';

export const GalleryContent: FC<GalleryComponentMetadata> = ({ title, apiPath, marginPx, batchSize }): ReactElement => {
    const { maxImages, setMaxImages } = useContext(MaxImagesContext);
    const galleryContent = useGalleryContent(apiPath, maxImages);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const { images, allImageFiles } = galleryContent;

    // TODO: Move to context so that LightBox and Gallery can update independently
    const loadMoreImages = useCallback((minimum?: number) => {
        setMaxImages?.((prevMaxImages) =>
            prevMaxImages < (allImageFiles?.length ?? 0)
                ? Math.max(prevMaxImages, minimum ?? 0) + batchSize
                : prevMaxImages
        );
    }, [allImageFiles, batchSize, setMaxImages]);

    // TODO: Move to LightBox component once
    //       (a) maxImages is in global context
    //       (b) useQuery uses Suspense and error boundary (GalleryBoundary component?)
    const [searchParams] = useSearchParams();
    const lightBoxImageName = searchParams.get('file');
    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    useEffect(() => {
        if ( images && allImageFiles
             && lightBoxImageIndex >= (images.length - 2) 
             && images.length < allImageFiles.length
        ) {
            loadMoreImages(lightBoxImageIndex);
        }
    }, [images, allImageFiles, loadMoreImages, lightBoxImageIndex]);

    // TODO: Move to LightBox component
    if (galleryContent.images && lightBoxImageName && lightBoxImageIndex < 0) {
        // Handle invalid lightBox image
        return <Navigate to='..' replace={true} />;
    }

    return (
        <div ref={widthRef} className="gallery-content">
            <Helmet><title>{title}</title></Helmet>
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
        </div>
    );
};
