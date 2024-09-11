import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbMetadata } from '../../site/api';
import { VideoDbContext, initialFilters, useVideoDbState } from '../hooks/useVideoDbState';

import { VideoDbContent } from './VideoDbContent';

export const VideoDb: FC<VideoDbMetadata> = ({ title, apiPath }): ReactElement => {
    const initialState = { title, apiPath, filters: initialFilters, pendingFlagUpdates: [] };

    return (
        <VideoDbContext.Provider value={useVideoDbState(initialState)} >
            <Suspense fallback='Loading...'>
                <VideoDbContent />
            </Suspense>
        </VideoDbContext.Provider>
    );
};
