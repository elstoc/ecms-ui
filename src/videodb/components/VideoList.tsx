import React, { createRef, FC, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useElementIsVisible } from '../../shared/hooks/useElementIsVisible';
import { useGetVideos } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { VideoToolbox } from './VideoToolbox';
import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList: FC = (): ReactElement => {
    const [searchParams] = useSearchParams();
    const { videoDbState: { apiPath,  limit }, videoDbReducer } = useContext(VideoDbStateContext);
    const { maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst } = Object.fromEntries(searchParams.entries());

    const videos = useGetVideos(apiPath, {
        maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst,
        limit: limit?.toString()
    });

    const refLastVideo = createRef<HTMLDivElement>();
    useElementIsVisible(refLastVideo, () => videoDbReducer({ action: 'increaseLimit', currentlyLoaded: videos.length }));

    return (
        <div className='video-list-container'>
            <VideoToolbox />
            <div className='video-list'>
                {videos.map((video, index) => (
                    <VideoListItem
                        key={video.id}
                        video={video}
                        ref={index === limit - 1 ? refLastVideo : null}
                    />
                ))}
            </div>
        </div>
    );
};
