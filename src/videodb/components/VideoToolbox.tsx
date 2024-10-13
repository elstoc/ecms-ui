import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { downloadVideoCSV } from '../utils/downloadVideoCSV';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { patchVideoDbVideos, VideoUpdate } from '../api';
import { useUserIsAdmin } from '../../auth/hooks/useAuthQueries';
import { useIsDualPanel } from '../../shared/hooks';

import { Icon } from '../../shared/components/icon';
import { AppToaster } from '../../shared/components/toaster';

export const VideoToolbox: FC = (): ReactElement => {
    const userIsAdmin = useUserIsAdmin();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { videoDbState: { apiPath, pendingFlagUpdates, }, videoDbReducer } = useContext(VideoDbStateContext);
    const isDualPanel = useIsDualPanel();

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

    if (!userIsAdmin && isDualPanel) {
        return <></>;
    }
    
    return (
        <>
            {flagUpdateCount > 0 &&
                <>
                    <Icon
                        name='cancel'
                        color='firebrick'
                        onClick={() => videoDbReducer({ action: 'resetFlagUpdates' })}
                        tooltipContent={`cancel ${flagUpdateCount} flag updates`}
                        tooltipPosition='top-right'
                    />
                    <Icon
                        name='check'
                        className='check'
                        color='green'
                        onClick={postFlagUpdates}
                        tooltipContent={`update ${flagUpdateCount} flags`}
                        tooltipPosition='top-right'
                    />
                </>}
            <Icon
                name='download'
                disabled={!userIsAdmin}
                onClick={downloadCSV}
                tooltipContent='download all videos as CSV'
                tooltipPosition='top-right'
            />
            <Icon
                name='add'
                disabled={!userIsAdmin}
                onClick={() => navigate(`./add?${searchParams.toString()}`)}
                tooltipContent='add new video'
                tooltipPosition='top-right'
            />
        </>
    );
};
