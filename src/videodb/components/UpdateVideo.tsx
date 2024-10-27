import React, { FC, ReactElement, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { VideoWithId } from '../api';
import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { showToast } from '../../shared/components/toaster';
import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo: FC = (): ReactElement => {
    const navigate = useNavigate();

    const { id } = useParams();
    const numericId = parseInt(id ?? '0');
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);

    const { data: storedVideo, isFetching } = useGetVideo(apiPath, numericId);
    const { mutate: deleteMutate } = useDeleteVideo(apiPath, numericId);
    const { mutate: putMutate } = usePutVideo(apiPath, numericId);

    const putVideo = async (video: VideoWithId) => {
        putMutate(video, {
            onSuccess: async () => {
                await showToast('saved', 2000);
                navigate(-1);
            },
            onError: (err) => showToast(`error: ${err.message}`)
        });
    };

    const deleteVideo = async () => {
        deleteMutate(undefined, {
            onSuccess: async () => {
                await showToast('deleted', 2000);
                navigate(-1);
            },
            onError: (err) => showToast(`error: ${err.message}`)
        });
    };

    return (
        <Dialog
            title="Update Video"
            isOpen={!isFetching}
            onClose={() => navigate(-1)}
            canEscapeKeyClose={false}
            className='update-video'
        >
            <DialogBody useOverflowScrollContainer={false}>
                <EditVideoForm
                    initialVideoState={storedVideo}
                    onSave={putVideo}
                    onDelete={deleteVideo}
                />
            </DialogBody>
        </Dialog>
    );
};
