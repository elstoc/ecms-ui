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

    const refLoadMore = createRef<HTMLDivElement>();
    useElementIsVisible(refLoadMore, () => stateReducer({ action: 'increaseLimit', currentlyLoaded: currentlyLoadedCount }));

    const videoElements = videos.map((video, index) => (
        <VideoListItem
            key={video.id}
            video={video}
            apiPath={apiPath}
            ref={index === limit - 1 ? refLoadMore : null }
        />
    ));

    return (
        <div className='videodb-list'>
            {videoElements}
        </div>
    );
};
