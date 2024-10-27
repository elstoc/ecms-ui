import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { postVideoDbVideo, Video, VideoWithId } from '../api';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { EditVideoForm } from './EditVideoForm';
import { showToast } from '../../shared/components/toaster';

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
    const queryClient = useQueryClient();

    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);

    const addVideo = useCallback(async (video: VideoWithId) => {
        try {
            const videoWithoutId = { ...video, id: undefined } as Video;
            await postVideoDbVideo(apiPath, videoWithoutId);
            await showToast('saved', 2000);
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags']});
            navigate(-1);
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient, navigate]);

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
