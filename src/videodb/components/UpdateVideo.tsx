import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { putVideoDbVideo, VideoWithId } from '../api';
import { useDeleteVideo, useGetVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { showToast } from '../../shared/components/toaster';
import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo: FC = (): ReactElement => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);
    const { data: storedVideo, isFetching } = useGetVideo(apiPath, parseInt(id ?? '0'));
    const { mutate } = useDeleteVideo(apiPath, parseInt(id ?? '0'));

    const updateVideo = useCallback(async (video: VideoWithId) => {
        try {
            await putVideoDbVideo(apiPath, video);
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', video.id]});
            navigate(-1);
            await showToast('saved', 2000);
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags']});
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient, navigate]);

    const deleteVideo = async () => {
        mutate(undefined, {
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
                    onSave={updateVideo}
                    onDelete={deleteVideo}
                />
            </DialogBody>
        </Dialog>
    );
};
