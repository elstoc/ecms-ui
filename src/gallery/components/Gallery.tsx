import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { GalleryMetadata } from '../../site/api';
import { GalleryStateContext, useGalleryStateReducer, getInitialState } from '../hooks/useGalleryState';

import { NotFoundPage } from '../../shared/components/NotFoundPage';
import { GalleryContent } from './GalleryContent';

export const Gallery: FC<GalleryMetadata> = (props): ReactElement => {
    const { apiPath, title } = props;
    const { galleryState, galleryStateReducer } = useGalleryStateReducer(getInitialState(apiPath, title));

    return (
        <GalleryStateContext.Provider value={{galleryState, galleryStateReducer}}>
            <Suspense>
                <Routes>
                    <Route path='/' element={<GalleryContent />} />
                    <Route path='*' element={<NotFoundPage sourceComponent='gallery' />} />
                </Routes>
            </Suspense>
        </GalleryStateContext.Provider>
    );
};
