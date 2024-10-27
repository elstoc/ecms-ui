import React, { FC, ReactElement, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { VideoWithId } from '../api';
import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo: FC = (): ReactElement => {
    const navigate = useNavigate();

    const { id } = useParams();
    const numericId = parseInt(id ?? '0');
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);

    const { data: storedVideo, isFetching } = useGetVideo(apiPath, numericId);
    const { mutate: deleteMutate } = useDeleteVideo(apiPath, numericId, 'deleted');
    const { mutate: putMutate } = usePutVideo(apiPath, numericId, 'saved');

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
