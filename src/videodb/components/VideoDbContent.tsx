import React, { FC, ReactElement, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserIsAdmin } from '../../auth/hooks/useAuthQueries';

import { VideoList } from './VideoList';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';

import './VideoDbContent.scss';

export const VideoDbContent: FC = (): ReactElement => {
    const userIsAdmin = useGetUserIsAdmin();
    const { mode, id } = useParams();

    // suspense is wrapped around routes and page elements separately to stop screen flashing
    return (
        <div className='video-content'>
            {userIsAdmin &&
                <Suspense>
                    {mode === 'add' && <AddVideo />}
                    {mode === 'update' && <UpdateVideo id={parseInt(id ?? '0')} />}
                </Suspense>
            }
            <VideoList />
        </div>
    );
};
