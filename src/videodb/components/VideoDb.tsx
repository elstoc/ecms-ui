import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbProps, VideoDbContent } from './VideoDbContent';
import { VideoDbContext, VideoDbState, useVideoDbState } from '../hooks/useVideoDbState';

export const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    return (
        <VideoDbContext.Provider value={useVideoDbState({ filters: {} } as VideoDbState)} >
            <Suspense fallback='Loading...'>
                <VideoDbContent {...props} />
            </Suspense>
        </VideoDbContext.Provider>
    );
};
