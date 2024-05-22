import React, { FC, ReactElement, useContext } from 'react';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';
import { useTitle } from '../../common/hooks';

import './GalleryContent.css';

export const GalleryContent: FC = (): ReactElement => {
    const { galleryState: { title } } = useContext(GalleryStateContext);
    useTitle(title);

    return (
        <div className="gallery-content">
            <GalleryLightBox />
            <JustifiedGallery />
        </div>
    );
};
