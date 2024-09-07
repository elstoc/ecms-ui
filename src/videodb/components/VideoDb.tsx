import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbComponentMetadata } from '../../site/api';
import { VideoDbContent } from './VideoDbContent';
import { VideoDbContext, initialFilters, useVideoDbState } from '../hooks/useVideoDbState';

export const VideoDb: FC<VideoDbComponentMetadata> = ({ title, apiPath }): ReactElement => {
    const initialState = { title, apiPath, filters: initialFilters, pendingFlagUpdates: [] };

    return (
        <VideoDbContext.Provider value={useVideoDbState(initialState)} >
            <Suspense fallback='Loading...'>
                <VideoDbContent />
            </Suspense>
        </VideoDbContext.Provider>
    );
};
