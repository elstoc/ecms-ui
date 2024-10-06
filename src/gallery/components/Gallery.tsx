import React, { FC, ReactElement, Suspense } from 'react';

import { GalleryMetadata } from '../../site/api';
import { GalleryStateContext, useGalleryStateReducer, getInitialState } from '../hooks/useGalleryState';

import { GalleryContent } from './GalleryContent';

export const Gallery: FC<GalleryMetadata> = (props): ReactElement => {
    const { apiPath, title } = props;
    const { galleryState, galleryStateReducer } = useGalleryStateReducer(getInitialState(apiPath, title));

    return (
        <GalleryStateContext.Provider value={{galleryState, galleryStateReducer}}>
            <Suspense>
                <GalleryContent />
            </Suspense>
        </GalleryStateContext.Provider>
    );
};
