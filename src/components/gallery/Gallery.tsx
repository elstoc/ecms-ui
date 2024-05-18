import React, { FC, ReactElement } from 'react';
import { GalleryContent } from './GalleryContent';

export type GalleryProps = {
    apiPath: string;
    title: string;
    marginPx: number;
    batchSize: number;
}

export const Gallery: FC<GalleryProps> = (props): ReactElement => {
    return <GalleryContent {...props} />;
};
