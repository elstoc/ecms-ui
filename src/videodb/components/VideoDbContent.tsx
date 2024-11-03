import React, { FC, ReactElement, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { useGetUserIsAdmin } from '../../auth/hooks/useAuthQueries';

import { NotFoundPage } from '../../shared/components/NotFoundPage';
import { VideoList } from './VideoList';
import { UpdateVideo } from './UpdateVideo';
import { AddVideo } from './AddVideo';

import './VideoDbContent.scss';

type VideoDbContentProps = {
    mode?: 'update' | 'add'
}

export const VideoDbContent: FC<VideoDbContentProps> = ({ mode }): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userIsAdmin = useGetUserIsAdmin();

    if (mode === 'update' && !Number.isInteger(parseInt(id || 'x'))) {
        return <NotFoundPage />;
    }

    return (
        <div className='video-content'>
            {userIsAdmin &&
                <Dialog
                    title={ mode === 'add' ? 'Add Video' : 'Update Video' }
                    isOpen={ mode === 'add' || mode === 'update' }
                    onClose={() => navigate(-1)}
                    canEscapeKeyClose={false}
                    canOutsideClickClose={false}
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
