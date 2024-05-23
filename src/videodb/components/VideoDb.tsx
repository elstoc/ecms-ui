import React, { FC, ReactElement, Suspense} from 'react';

import { VideoDbProps, VideoDbContent } from './VideoDbContent';
import { VideoDbContext, useGetFilterStateFromSearchParams, useVideoDbState } from '../hooks/useVideoDbState';

export const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    const getInitialFilters = useGetFilterStateFromSearchParams();
    const initialState = { filters: getInitialFilters() };

    return (
        <VideoDbContext.Provider value={useVideoDbState(initialState)} >
            <Suspense fallback='Loading...'>
                <VideoDbContent {...props} />
            </Suspense>
        </VideoDbContext.Provider>
    );
};
