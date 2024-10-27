import React, { FC, ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { Video, VideoWithId } from '../api';
import { useAddVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { showToast } from '../../shared/components/toaster';
import { EditVideoForm } from './EditVideoForm';

const initialVideo = {
    id: 0, title: '', category: '',
    director: null, num_episodes: null, length_mins: null, watched: '', priority_flag: null,
    progress: null, imdb_id: null, image_url: null, year: null,
    actors: null, plot: null, tags: null,
    primary_media_type: null, primary_media_location: null,
    primary_media_watched: null, other_media_type: null,
    other_media_location: null, media_notes: null,
};

export const AddVideo: FC = (): ReactElement => {
    const navigate = useNavigate();
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);
    const { mutate } = useAddVideo(apiPath);

    const addVideo = async (video: VideoWithId) => {
        mutate(
            { ...video, id: undefined } as Video,
            {
                onSuccess: async () => {
                    await showToast('saved', 1000);
                    navigate(-1);
                },
                onError: async (err) => showToast(`error: ${err.message}`, 5000)
            }
        );
    };

    return (
        <Dialog
            title="Add new Video"
            isOpen={true}
            onClose={() => navigate(-1)}
            canEscapeKeyClose={false}
            className='update-video'
        >
            <DialogBody useOverflowScrollContainer={false}>
                <EditVideoForm initialVideoState={initialVideo} onSave={addVideo} />
            </DialogBody>
        </Dialog>
    );
};
