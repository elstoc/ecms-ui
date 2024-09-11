import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { GalleryContent } from './GalleryContent';
import { GalleryMetadata } from '../../site/api';
import { GalleryStateContextProps, GalleryState, useGalleryStateReducer } from '../hooks/useGalleryStateReducer';

const GalleryStateContext = createContext<GalleryStateContextProps>({} as GalleryStateContextProps);

const Gallery: FC<GalleryMetadata> = (props): ReactElement => {
    const { batchSize, marginPx, apiPath, title } = props;
    const initialState: GalleryState = {
        maxImages: batchSize,
        activeImageIndex: -1,
        marginPx, batchSize, apiPath, title
    };
    const { galleryState, galleryStateReducer } = useGalleryStateReducer(initialState);

    return (
        <GalleryStateContext.Provider value={{galleryState, galleryStateReducer}}>
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryContent />
            </Suspense>
        </GalleryStateContext.Provider>
    );
};

export { GalleryStateContext, Gallery };
