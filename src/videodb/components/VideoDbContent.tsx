import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useGetUserIsAdmin } from '../../auth/hooks/useAuthQueries';

import { VideoList } from './VideoList';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';

import './VideoDbContent.scss';

export const VideoDbContent: FC = (): ReactElement => {
    const userIsAdmin = useGetUserIsAdmin();

    // suspense is wrapped around routes and page elements separately to stop screen flashing
    return (
        <div className='video-content'>
            {userIsAdmin &&
                <Suspense>
                    <Routes>
                        <Route path="add" element={<AddVideo />} />
                        <Route path=":id" element={<UpdateVideo />} />
                    </Routes>
                </Suspense>
            }
            <VideoList />
        </div>
    );
};
