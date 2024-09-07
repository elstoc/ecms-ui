import React, { FC, ReactElement, useContext } from 'react';

import { useNthElementIsVisible } from '../../common/hooks';
import { useGetVideos } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useGetFilterSearchParams } from '../hooks/useVideoDbState';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList: FC = (): ReactElement => {
    const getFilterSearchParams = useGetFilterSearchParams();
    const { state: { apiPath, filters: { limit } }, stateReducer } = useContext(VideoDbContext);

    const videos = useGetVideos(apiPath, { ...getFilterSearchParams(), limit: limit?.toString() } );
    const currentlyLoadedCount = videos.length;

    const videoElements = videos.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />);
    useNthElementIsVisible(videoElements, limit - 1, () => stateReducer({ action: 'increaseLimit', currentlyLoaded: currentlyLoadedCount }));

    return (
        <div className='videodb-list'>
            {videoElements}
        </div>
    );
};
