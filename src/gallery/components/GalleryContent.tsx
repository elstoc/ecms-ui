import React, { FC, ReactElement, useContext } from 'react';

import { useTitle } from '../../common/hooks';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryStateContext } from './Gallery';
import { GalleryLightBox } from './GalleryLightBox';

import './GalleryContent.scss';

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
