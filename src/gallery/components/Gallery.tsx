import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { GalleryContent } from './GalleryContent';
import { GalleryComponentMetadata } from '../../site/api';
import { GalleryStateContextProps, GalleryState, useGalleryStateReducer } from '../hooks/useGalleryStateReducer';

export const GalleryStateContext = createContext<GalleryStateContextProps>({} as GalleryStateContextProps);

export const Gallery: FC<GalleryComponentMetadata> = (props): ReactElement => {
    const { batchSize, marginPx, apiPath, title } = props;
    const initialState: GalleryState = {
        maxImages: batchSize,
        activeImageIndex: -1,
        marginPx, batchSize, apiPath, title
    };
    const { galleryState, alterGalleryState } = useGalleryStateReducer(initialState);

    return (
        <GalleryStateContext.Provider value={{galleryState, alterGalleryState}}>
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryContent />
            </Suspense>
        </GalleryStateContext.Provider>
    );
};
