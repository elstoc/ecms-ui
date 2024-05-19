import React, { FC, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';

import './GalleryContent.css';

export const GalleryContent: FC = (): ReactElement => {
    const { galleryState: { title } } = useContext(GalleryStateContext);

    const [searchParams] = useSearchParams();
    const imageName = searchParams.get('image');

    return (
        <div className="gallery-content">
            <Helmet><title>{title}{imageName ? ` - ${imageName}` : ''}</title></Helmet>
            <GalleryLightBox />
            <JustifiedGallery />
        </div>
    );
};
