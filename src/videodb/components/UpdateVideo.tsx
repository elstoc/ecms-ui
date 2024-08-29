import React, { FC, ReactElement, Suspense, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { EditVideoForm } from './EditVideoForm';
import { useGetVideo } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { putVideoDbVideo, VideoWithId } from '../api';
import { AppToaster } from '../../common/components/toaster';

export const UpdateVideo: FC<{ id: number }> = ({ id }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const [, setSearchParams] = useSearchParams();
    const storedVideo = useGetVideo(apiPath, id);
    const queryClient = useQueryClient();

    const exitVideo = () => {
        setSearchParams((searchParams) => {
            searchParams.delete('id');
            return searchParams;
        });
    };

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
            isOpen={id > 0}
            onClose={exitVideo}
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
