import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@blueprintjs/core';

import { patchVideoDbVideos, VideoUpdate } from '../api';
import { downloadVideoCSV } from '../utils/downloadVideoCSV';

import { Icon } from '../../common/components/icon';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { AppToaster } from '../../common/components/toaster';

import './VideoActionButtons.scss';

export const VideoActionButtons: FC = (): ReactElement => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { videoDbState: { apiPath, pendingFlagUpdates, }, videoDbReducer } = useContext(VideoDbStateContext);

    const flagUpdateCount = Object.keys(pendingFlagUpdates).length;

    const postFlagUpdates = useCallback(async () => {
        try {
            const videoUpdates: VideoUpdate[] = [];
            for (const [id, priority_flag] of Object.entries(pendingFlagUpdates)) {
                videoUpdates.push({ id: parseInt(id), priority_flag });
            }
            await patchVideoDbVideos(apiPath, videoUpdates);
            (await AppToaster).show({ message: 'flags updated', timeout: 2000 });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            videoDbReducer({ action: 'resetFlagUpdates' });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, pendingFlagUpdates, queryClient, videoDbReducer]);

    const downloadCSV = useCallback(async () => {
        await downloadVideoCSV(apiPath);
    }, [apiPath]);

    return (
        <div className='video-action-buttons'>
            <div>
                <Button onClick={downloadCSV}>Download all videos as CSV</Button>
                <Button><Link to={`./add?${searchParams.toString()}`}>Add New Video</Link></Button>
            </div>
            {flagUpdateCount > 0 &&
                <div>
                    <Button onClick={postFlagUpdates}>Update {flagUpdateCount} Flags</Button>
                    <Icon name='cancel' onClick={() => videoDbReducer({ action: 'resetFlagUpdates' })} />
                </div>
            }
        </div>
    );
};
