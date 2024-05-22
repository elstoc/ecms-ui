import React, { FC, ReactElement, useContext } from 'react';
import { Helmet } from 'react-helmet';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';

import './GalleryContent.css';

export const GalleryContent: FC = (): ReactElement => {
    const { galleryState: { title } } = useContext(GalleryStateContext);

    return (
        <div className="gallery-content">
            <Helmet><title>{title}</title></Helmet>
            <GalleryLightBox />
            <JustifiedGallery />
        </div>
    );
};
