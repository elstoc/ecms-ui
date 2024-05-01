import React, { FC, ReactElement } from 'react';

import { VideoWithId } from '../../types/VideoDb';

import './VideoListItem.scss';
import { useVideoDbLookup } from '../../hooks/useApiQueries';

type VideoDbProps = {
    apiPath: string;
    video: VideoWithId;
}

export const VideoListItem: FC<VideoDbProps> = ({ apiPath, video }): ReactElement => {
    const [, categoryLookup] = useVideoDbLookup(apiPath, 'categories');
    const [, watchedStatusLookup] = useVideoDbLookup(apiPath, 'watched_status');
    return (
        <div className='video-list-item'>
            <div className='video-name'>{ video.title }</div>
            <div className='sub-info'>
                <span className='category'>{categoryLookup?.[video.category]}</span>
                {video.length_mins > 0 && <span> | {video.length_mins} mins</span>}
                {video.watched && <span> | watched: {watchedStatusLookup?.[video.watched]}</span>}
                {video.to_watch_priority && <span> | to Watch Priority: {video.to_watch_priority}</span>}
            </div>
        </div>
    );
};
