import React, { FC, ReactElement, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { useGetUserIsAdmin } from '../../auth/hooks/useAuthQueries';

import { VideoList } from './VideoList';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';

import './VideoDbContent.scss';

export const VideoDbContent: FC = (): ReactElement => {
    const navigate = useNavigate();
    const userIsAdmin = useGetUserIsAdmin();
    const { mode, id } = useParams();

    return (
        <div className='video-content'>
            {userIsAdmin &&
                <Dialog
                    title={ mode === 'add' ? 'Add Video' : 'Update Video' }
                    isOpen={ mode === 'add' || mode === 'update' }
                    onClose={() => navigate(-1)}
                    canEscapeKeyClose={false}
                >
                    <DialogBody useOverflowScrollContainer={false}>
                        <Suspense>
                            {mode === 'add' && <AddVideo />}
                            {mode === 'update' && <UpdateVideo id={parseInt(id ?? '0')} />}
                        </Suspense>
                    </DialogBody>
                </Dialog>
            }
            <VideoList />
        </div>
    );
};
