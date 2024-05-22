import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { VideoDbProps, VideoDbContent } from './VideoDbContent';
import { VideoDbQueryStateContextProps, useVideoDbQueryParams } from '../hooks/useVideoDbQueryParams';

const VideoDbQueryParamContext = createContext({} as VideoDbQueryStateContextProps);

const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    const contextProps = useVideoDbQueryParams();

    return (
        <VideoDbQueryParamContext.Provider value={contextProps} >
            <Suspense fallback='Loading...'>
                <VideoDbContent {...props} />
            </Suspense>
        </VideoDbQueryParamContext.Provider>
    );
};

export { VideoDb, VideoDbQueryParamContext };
