import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@blueprintjs/core';

import { patchVideoDbVideos, VideoUpdate } from '../api';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { AppToaster } from '../../common/components/toaster';

import './VideoActionButtons.scss';

export const VideoActionButtons: FC = (): ReactElement => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { state: { apiPath, pendingFlagUpdates, }, stateReducer } = useContext(VideoDbContext);

    const flagUpdateCount = Object.keys(pendingFlagUpdates).length;

    const postFlagUpdates = useCallback(async () => {
        try {
            const videoUpdates: VideoUpdate[] = [];
            for (const [id, to_watch_priority] of Object.entries(pendingFlagUpdates)) {
                videoUpdates.push({ id: parseInt(id), to_watch_priority });
            }
            await patchVideoDbVideos(apiPath, videoUpdates);
            (await AppToaster).show({ message: 'flags updated', timeout: 2000 });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            stateReducer({ action: 'resetFlagUpdates' });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, pendingFlagUpdates, queryClient, stateReducer]);

    return (
        <div className='video-action-buttons'>
            {flagUpdateCount > 0 &&
                <>
                    <Button onClick={postFlagUpdates}>Update {flagUpdateCount} Flags</Button>
                    <Button onClick={() => stateReducer({ action: 'resetFlagUpdates' })}>Reset Flags</Button>
                </>
            }
            <Link to={`./add?${searchParams.toString()}`}><Button>Add New Video</Button></Link>
        </div>
    );
};
