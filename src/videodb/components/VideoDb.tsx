import React, { FC, ReactElement, Suspense} from 'react';
import { Route, Routes } from 'react-router';

import { useTitle } from '../../shared/hooks';
import { VideoDbMetadata } from '../../site/api';
import { VideoDbStateContext, useVideoDbState } from '../hooks/useVideoDbStateContext';

import { VideoDbContent } from './VideoDbContent';
import { VideoToolbox } from './VideoToolbox';
import { VideoFilters } from './VideoFilters';
import { ContentWithSidebar } from '../../shared/components/layout';

export const VideoDb: FC<VideoDbMetadata> = ({ title, apiPath }): ReactElement => {
    const videoDbState = useVideoDbState(title, apiPath);

    useTitle(title);

    const toolbar = (
        <Suspense>
            <VideoToolbox />
        </Suspense>
    );

    const filters = (
        <Suspense>
            <VideoFilters />
        </Suspense>
    );

    const content = (
        <Suspense>
            <Routes>
                <Route
                    path=':mode?/:id?'
                    element={<VideoDbContent />}
                />
            </Routes>
        </Suspense>
    );

    return (
        <VideoDbStateContext.Provider value={videoDbState} >
            <Suspense>
                <ContentWithSidebar
                    content={content}
                    sidebar={filters}
                    toolbarIcons={toolbar}
                />
            </Suspense>
        </VideoDbStateContext.Provider>
    );
};
