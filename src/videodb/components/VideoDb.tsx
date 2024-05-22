import React, { FC, ReactElement, Suspense, createContext } from 'react';

import { VideoDbProps, VideoDbContent } from './VideoDbContent';
import { VideoDbQueryStateContextProps, useVideoDbQueryParams } from '../hooks/useVideoDbQueryParams';

export const VideoDbQueryParamContext = createContext({} as VideoDbQueryStateContextProps);

export const VideoDb: FC<VideoDbProps> = (props): ReactElement => {
    const contextProps = useVideoDbQueryParams();

    return (
        <VideoDbQueryParamContext.Provider value={contextProps} >
            <Suspense fallback='Loading...'>
                <VideoDbContent {...props} />
            </Suspense>
        </VideoDbQueryParamContext.Provider>
    );
};
