import React, { FC, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import { Helmet } from 'react-helmet';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';

import './GalleryContent.css';

export const GalleryContent: FC = (): ReactElement => {
    const { galleryState: { title } } = useContext(GalleryStateContext);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const [searchParams] = useSearchParams();
    const imageName = searchParams.get('file');

    return (
        <div ref={widthRef} className="gallery-content">
            <Helmet><title>{title}{imageName ? ` - ${imageName}` : ''}</title></Helmet>
            <GalleryLightBox />
            <JustifiedGallery
                galleryDivWidth={galleryDivWidth!}
            />
        </div>
    );
};
