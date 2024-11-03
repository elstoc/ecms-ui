import React, { FC, ReactElement, Suspense} from 'react';
import { Route, Routes } from 'react-router';

import { useTitle } from '../../shared/hooks';
import { VideoDbMetadata } from '../../site/api';
import { VideoDbStateContext, useVideoDbState } from '../hooks/useVideoDbStateContext';

import { NotFoundPage } from '../../shared/components/NotFoundPage';
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
                <Route path='update/:id' element={<VideoDbContent mode='update' />} />
                <Route path='edit' element={<VideoDbContent mode='add' />} />
                <Route path='/' element={<VideoDbContent />} />
                <Route key='*' path='*' element={<NotFoundPage sourceComponent='video' />} />
            </Routes>
        </Suspense>
    );

    // suspense is wrapped around routes and page elements separately to stop screen flashing
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
