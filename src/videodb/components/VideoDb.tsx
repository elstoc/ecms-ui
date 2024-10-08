import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbMetadata } from '../../site/api';
import { VideoDbStateContext, useVideoDbState } from '../hooks/useVideoDbStateContext';

import { VideoDbContent } from './VideoDbContent';

export const VideoDb: FC<VideoDbMetadata> = ({ title, apiPath }): ReactElement => {
    const videoDbState = useVideoDbState(title, apiPath);

    return (
        <VideoDbStateContext.Provider value={videoDbState} >
            <Suspense>
                <VideoDbContent />
            </Suspense>
        </VideoDbStateContext.Provider>
    );
};
