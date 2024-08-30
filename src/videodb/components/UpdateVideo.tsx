import React, { FC, ReactElement, Suspense, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { EditVideoForm } from './EditVideoForm';
import { useGetVideo } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { putVideoDbVideo, VideoWithId } from '../api';
import { AppToaster } from '../../common/components/toaster';

export const UpdateVideo: FC = (): ReactElement => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state: { apiPath } } = useContext(VideoDbContext);
    const storedVideo = useGetVideo(apiPath, parseInt(id ?? '0'));
    const queryClient = useQueryClient();

    const saveVideo = useCallback(async (video: VideoWithId) => {
        try {
            await putVideoDbVideo(apiPath, video);
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', video.id]});
            (await AppToaster).show({ message: 'saved', timeout: 2000 });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient]);

    return (
        <Dialog
            title="Video"
            isOpen={storedVideo.id > 0}
            onClose={() => navigate(-1)}
            canEscapeKeyClose={false}
            className='update-video'
        >
            <DialogBody>
                <Suspense fallback='Loading'>
                    <EditVideoForm initialVideoState={storedVideo} onSave={saveVideo} />
                </Suspense>
            </DialogBody>
        </Dialog>
    );
};
