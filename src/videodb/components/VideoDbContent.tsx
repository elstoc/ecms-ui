import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { VideoList } from './VideoList';
import { VideoFilters } from './VideoFilters';
import { UpdateVideo } from './UpdateVideo';
import { useTitle } from '../../common/hooks';
import { VideoDbContext, useUpdateStateOnSearchParamChange } from '../hooks/useVideoDbState';
import { ContentWithSidebar } from '../../common/components/layout';
import { Route, Routes } from 'react-router-dom';
import { AddVideo } from './AddVideo';

export const VideoDbContent: FC = (): ReactElement => {
    const { state: { title } } = useContext(VideoDbContext);
    useUpdateStateOnSearchParamChange();
    useTitle(title);

    const videoFiltersElement = (
        <Suspense fallback='Loading...'>
            <VideoFilters />
        </Suspense>
    );

    const videoListElement = (
        <Suspense fallback='Loading...'>
            <VideoList />
        </Suspense>
    );

    return (
        <>
            <Suspense>
                <Routes>
                    <Route path="add" element={<AddVideo />} />
                    <Route path=":id" element={<UpdateVideo />} />
                </Routes>
            </Suspense>
            <ContentWithSidebar
                mainPageElement={videoListElement}
                sidebarElement={videoFiltersElement}
                mobileSidebarAtTop={true}
            />
        </>
    );
};
