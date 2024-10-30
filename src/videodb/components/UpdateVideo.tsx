import React, { FC, ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { VideoWithId } from '../api';
import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo: FC<{ id: number }> = ({ id }): ReactElement => {
    const navigate = useNavigate();

    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);

    const { data: storedVideo, isFetching } = useGetVideo(apiPath, id);
    const { mutate: deleteMutate } = useDeleteVideo(apiPath, id, 'deleted');
    const { mutate: putMutate } = usePutVideo(apiPath, id, 'saved');

    const putVideo = async (video: VideoWithId) => putMutate(
        video, { onSuccess: () => navigate(-1) }
    );

    const deleteVideo = async () => deleteMutate(
        undefined, { onSuccess: async () => navigate(-1) }
    );

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
