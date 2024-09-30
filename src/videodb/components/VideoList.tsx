import React, { createRef, FC, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useElementIsVisible } from '../../common/hooks/useElementIsVisible';
import { useGetVideos } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList: FC = (): ReactElement => {
    const [searchParams] = useSearchParams();
    const { videoDbState: { apiPath,  limit }, videoDbReducer } = useContext(VideoDbContext);
    const { maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst } = Object.fromEntries(searchParams.entries());

    const videos = useGetVideos(apiPath, {
        maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst,
        limit: limit?.toString()
    });

    const refLastVideo = createRef<HTMLDivElement>();
    useElementIsVisible(refLastVideo, () => videoDbReducer({ action: 'increaseLimit', currentlyLoaded: videos.length }));

    return (
        <div className='video-list'>
            {videos.map((video, index) => (
                <VideoListItem
                    key={video.id}
                    video={video}
                    apiPath={apiPath}
                    ref={index === limit - 1 ? refLastVideo : null}
                />
            ))}
        </div>
    );
};
