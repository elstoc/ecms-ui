import React, { FC, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import { Helmet } from 'react-helmet';

import { useGalleryContent } from '../../hooks/useApiQueries';
import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';

import './GalleryContent.css';

export const GalleryContent: FC = (): ReactElement => {
    const { galleryState } = useContext(GalleryStateContext);
    const { apiPath, title, maxImages } = galleryState;
    // TODO: combine the following
    const galleryContent = useGalleryContent(apiPath, maxImages);
    const { allImageFiles } = galleryContent;
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    // TODO: Move to LightBox component once
    //       (a) maxImages is in global context
    //       (b) useQuery uses Suspense and error boundary (GalleryBoundary component?)
    const [searchParams] = useSearchParams();
    const lightBoxImageName = searchParams.get('file');
    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    return (
        <div ref={widthRef} className="gallery-content">
            <Helmet><title>{title}{lightBoxImageName ? ` - ${lightBoxImageName}` : ''}</title></Helmet>
            <GalleryLightBox />
            <JustifiedGallery
                galleryContent={galleryContent!}
                galleryDivWidth={galleryDivWidth!}
                lightBoxImageIndex={lightBoxImageIndex}
            />
        </div>
    );
};
