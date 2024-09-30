import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbMetadata } from '../../site/api';
import { VideoDbContext, useVideoDbState } from '../hooks/useVideoDbState';

import { VideoDbContent } from './VideoDbContent';

export const VideoDb: FC<VideoDbMetadata> = ({ title, apiPath }): ReactElement => {
    const videoDbState = useVideoDbState(title, apiPath);

    return (
        <VideoDbContext.Provider value={videoDbState} >
            <Suspense>
                <VideoDbContent />
            </Suspense>
        </VideoDbContext.Provider>
    );
};
