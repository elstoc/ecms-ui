import React, { FC, ReactElement, Suspense } from 'react';

import { GalleryContent } from './GalleryContent';
import { GalleryComponentMetadata } from '../../types/Site';

export const Gallery: FC<GalleryComponentMetadata> = (props): ReactElement => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryContent {...props} />
        </Suspense>
    );
};
