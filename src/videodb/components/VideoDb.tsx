import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { VideoDbProps, VideoDbContent } from './VideoDbContent';
import { VideoDbContextProps, useVideoDbContextProps } from '../hooks/useVideoDbContextParams';

const VideoDbContext = createContext({} as VideoDbContextProps);

const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    const contextProps = useVideoDbContextProps();

    return (
        <VideoDbContext.Provider value={contextProps} >
            <Suspense fallback='Loading...'>
                <VideoDbContent {...props} />
            </Suspense>
        </VideoDbContext.Provider>
    );
};

export { VideoDb, VideoDbContext };
