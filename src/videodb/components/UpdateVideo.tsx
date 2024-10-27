import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { deleteVideoDbVideo, putVideoDbVideo, VideoWithId } from '../api';
import { useGetVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { showToast } from '../../shared/components/toaster';
import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo: FC = (): ReactElement => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);
    const { data: storedVideo, isFetching } = useGetVideo(apiPath, parseInt(id ?? '0'));

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

    const deleteVideo = useCallback(async (id: number) => {
        try {
            await deleteVideoDbVideo(apiPath, id);
            navigate(-1);
            await showToast('deleted', 2000);
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', id] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags']});
        } catch(error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient, navigate]);

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
