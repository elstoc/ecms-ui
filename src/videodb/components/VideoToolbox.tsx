import React, { FC, ReactElement, ReactNode, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { downloadVideoCSV } from '../utils/downloadVideoCSV';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { patchVideoDbVideos, VideoUpdate } from '../api';
import { useUserIsAdmin } from '../../auth/hooks/useAuthQueries';
import { useIsDualPanel } from '../../shared/hooks';

import { Icon } from '../../shared/components/icon';
import { AppToaster } from '../../shared/components/toaster';

import './VideoToolbox.scss';

type VideoToolboxProps = {
    children: ReactNode
}

export const VideoToolbox: FC<VideoToolboxProps> = ({ children }): ReactElement => {
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

    let flagUpdateAdminIcons = <></>;
    let otherUpdateIcons = <></>;

    if (!userIsAdmin && isDualPanel) {
        return <div className='video-content'>{children}</div>;
    }
    if (userIsAdmin) {
        otherUpdateIcons = (
            <>
                <Icon
                    name='download'
                    onClick={downloadCSV}
                    tooltipContent='download all videos as CSV'
                    tooltipPosition='top-right'
                />
                <Icon
                    name='add'
                    onClick={() => navigate(`./add?${searchParams.toString()}`)}
                    tooltipContent='add new video'
                    tooltipPosition='top-right'
                />
            </>
        );

        if (flagUpdateCount > 0) {
            flagUpdateAdminIcons = (
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
                </>
            );
        }
    }
    return (
        <div className='video-content'>
            <div className='video-toolbox'>
                {!isDualPanel &&
                    <div className='navmenu'>
                        <Icon
                            name='menu'
                            onClick={() => videoDbReducer({ action: 'setNavOpen', value: true })}
                        />
                    </div>}
                {flagUpdateAdminIcons}
                {otherUpdateIcons}
            </div>
            {children}
        </div>
    );
};
