import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useTitle } from '../../shared/hooks';
import { useUserIsAdmin } from '../../auth/hooks/useAuthQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { ContentWithSidebar } from '../../shared/components/layout';
import { VideoList } from './VideoList';
import { VideoFilters } from './VideoFilters';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';
import { VideoToolbox } from './VideoToolbox';

import './VideoDbContent.scss';

export const VideoDbContent: FC = (): ReactElement => {
    const { videoDbState: { title } } = useContext(VideoDbStateContext);
    const userIsAdmin = useUserIsAdmin();

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

    const list = (
        <Suspense>
            <div className='video-content'>
                <VideoList />
            </div>
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
                content={list}
                sidebar={filters}
                toolbar={toolbar}
            />
        </>
    );
};
