import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { GalleryMetadata } from '../../site/api';
import { GalleryStateContextProps, GalleryState, useGalleryStateReducer } from '../hooks/useGalleryStateReducer';

import { GalleryContent } from './GalleryContent';

const GalleryStateContext = createContext<GalleryStateContextProps>({} as GalleryStateContextProps);

const Gallery: FC<GalleryMetadata> = (props): ReactElement => {
    const { batchSize, apiPath, title } = props;
    const initialState: GalleryState = {
        maxImages: batchSize,
        activeImageIndex: -1,
        batchSize, apiPath, title
    };
    const { galleryState, galleryStateReducer } = useGalleryStateReducer(initialState);

    return (
        <GalleryStateContext.Provider value={{galleryState, galleryStateReducer}}>
            <Suspense>
                <GalleryContent />
            </Suspense>
        </GalleryStateContext.Provider>
    );
};

export { GalleryStateContext, Gallery };
