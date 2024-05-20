import React, { FC, ReactElement, Suspense } from 'react';
import { VideoDbProps, VideoDbContent } from './VideoDbContent';

export const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    return (
        <Suspense fallback='Loading...'>
            <VideoDbContent {...props} />
        </Suspense>
    );
};
