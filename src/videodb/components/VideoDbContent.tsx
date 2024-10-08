import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useTitle } from '../../common/hooks';
import { useUserIsAdmin } from '../../auth/hooks/useAuthQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { ContentWithSidebar } from '../../common/components/layout';
import { VideoList } from './VideoList';
import { VideoFilters } from './VideoFilters';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';
import { VideoActionButtons } from './VideoActionButtons';

export const VideoDbContent: FC = (): ReactElement => {
    const userIsAdmin = useUserIsAdmin();

    const { videoDbState: { title } } = useContext(VideoDbStateContext);
    useTitle(title);

    const videoFilters = (
        <Suspense>
            <VideoFilters />
            {userIsAdmin && <VideoActionButtons />}
        </Suspense>
    );

    const videoList = (
        <Suspense>
            <VideoList />
        </Suspense>
    );

    // suspense is wrapped around routes and page elements separately to stop screen flashing
    return (
        <>
            {userIsAdmin &&
                <Suspense>
                    <Routes>
                        <Route path="add" element={<AddVideo />} />
                        <Route path=":id" element={<UpdateVideo />} />
                    </Routes>
                </Suspense>
            }
            <ContentWithSidebar
                contentElement={videoList}
                sidebarElement={videoFilters}
                mobileSidebarAtTop={true}
            />
        </>
    );
};
