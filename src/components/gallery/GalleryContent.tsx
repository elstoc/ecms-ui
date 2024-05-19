import React, { FC, ReactElement, useContext, useEffect } from 'react';
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

    // TODO: Move to LightBox component once
    //       (a) maxImages is in global context
    //       (b) useQuery uses Suspense and error boundary (GalleryBoundary component?)
    const [searchParams] = useSearchParams();
    const lightBoxImageName = searchParams.get('file');
    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    useEffect(() => {
        if ( lightBoxImageIndex > (images.length - 1) 
             && images.length < allImageFiles.length
        ) {
            setMaxImages?.(lightBoxImageIndex + 1);
        }
    }, [images, allImageFiles, lightBoxImageIndex, setMaxImages]);

    // TODO: Move to LightBox component
    if (galleryContent.images && lightBoxImageName && lightBoxImageIndex < 0) {
        // Handle invalid lightBox image
        return <Navigate to='..' replace={true} />;
    }

    return (
        <div ref={widthRef} className="gallery-content">
            <Helmet><title>{title}{lightBoxImageName ? ` - ${lightBoxImageName}` : ''}</title></Helmet>
            <GalleryLightBox
                currImage={images[lightBoxImageIndex]}
                nextImage={images[lightBoxImageIndex + 1]}
                prevImage={images[lightBoxImageIndex - 1]}
            />
            <JustifiedGallery
                galleryContent={galleryContent!}
                galleryDivWidth={galleryDivWidth!}
                marginPx={marginPx}
                lightBoxImageIndex={lightBoxImageIndex}
            />
        </div>
    );
};
