import React, { FC, ReactElement, Suspense, createContext, useState } from 'react';

import { GalleryContent } from './GalleryContent';
import { GalleryComponentMetadata } from '../../types/Site';

export type GalleryContextProps = {
    maxImages?: number;
    setMaxImages?: React.Dispatch<React.SetStateAction<number>>;
};

export const MaxImagesContext = createContext<GalleryContextProps>({});

export const Gallery: FC<GalleryComponentMetadata> = (props): ReactElement => {
    const [maxImages, setMaxImages] = useState(props.batchSize);
    // TODO: Add Error Boundary
    // TODO: Add context provider
    return (
        <MaxImagesContext.Provider value={{maxImages, setMaxImages}}>
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryContent {...props} />
            </Suspense>
        </MaxImagesContext.Provider>
    );
};
