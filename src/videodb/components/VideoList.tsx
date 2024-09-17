import React, { createRef, FC, ReactElement, useContext } from 'react';

import { useElementIsVisible } from '../../common/hooks/useElementIsVisible';
import { useGetVideos } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useGetFilterSearchParams } from '../hooks/useVideoDbState';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList: FC = (): ReactElement => {
    const getFilterSearchParams = useGetFilterSearchParams();
    const { state: { apiPath, filters: { limit } }, stateReducer } = useContext(VideoDbContext);

    const videos = useGetVideos(apiPath, { ...getFilterSearchParams(), limit: limit?.toString() } );
    const currentlyLoadedCount = videos.length;

    const refLastVideo = createRef<HTMLDivElement>();
    useElementIsVisible(refLastVideo, () => stateReducer({ action: 'increaseLimit', currentlyLoaded: currentlyLoadedCount }));

    const videoElements = videos.map((video, index) => (
        <VideoListItem
            key={video.id}
            video={video}
            apiPath={apiPath}
            ref={index === limit - 1 ? refLastVideo : null }
        />
    ));

    return (
        <div className='video-list'>
            {videoElements}
        </div>
    );
};
