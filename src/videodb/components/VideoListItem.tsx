import React, { FC, ReactElement, useCallback } from 'react';

import { VideoSummaryAndPrimaryMedium } from '../api';

import './VideoListItem.scss';
import { useVideoDbLookup } from '../hooks/useVideoDbQueries';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

type VideoDbProps = {
    apiPath: string;
    video: VideoSummaryAndPrimaryMedium;
}

export const VideoListItem: FC<VideoDbProps> = ({ apiPath, video }): ReactElement => {
    const [, setSearchParams] = useSearchParams();
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');
    const watchedStatusLookup = useVideoDbLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useVideoDbLookup(apiPath, 'media_types');

    const addIdToParams = useCallback((id: string): void => {
        setSearchParams((params) => {
            params.set('id', id);
            return params;
        });
    }, [setSearchParams]);

    const category = categoryLookup[video.category];
    const watchedStatus = watchedStatusLookup[video.watched];
    const pmWatchedStatus = watchedStatusLookup[video.pm_watched];
    const pMediaType = mediaTypeLookup[video.pm_media_type];

    return (
        <div className='video-list-item'>
            <div className='video-name'>{ video.title } <Button onClick={() => addIdToParams(video.id)}>Edit</Button></div>
            <div className='sub-info'>
                <span className='category'>{category}</span>
                {video.length_mins > 0 && <span> | {video.length_mins} mins</span>}
                {video.watched && <span> | watched: {watchedStatus}</span>}
                {video.to_watch_priority && <span> | to Watch Priority: {video.to_watch_priority}</span>}
                <span> | {pMediaType} ({pmWatchedStatus})</span>
            </div>
        </div>
    );
};
