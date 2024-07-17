import React, { forwardRef, ReactElement, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VideoSummaryAndPrimaryMedium } from '../api';
import { useGetLookup } from '../hooks/useVideoDbQueries';

import './VideoListItem.scss';

type VideoDbProps = {
    apiPath: string;
    video: VideoSummaryAndPrimaryMedium;
}

export const VideoListItem = forwardRef<HTMLDivElement, VideoDbProps>(({ apiPath, video }, ref): ReactElement => {
    const [, setSearchParams] = useSearchParams();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');

    const addIdToParams = useCallback((id: string): void => {
        setSearchParams((params) => {
            params.set('id', id);
            return params;
        });
    }, [setSearchParams]);

    const category = categoryLookup[video.category];
    const watchedStatus = watchedStatusLookup[video.watched];
    const pmWatchedStatus = video.pm_watched && watchedStatusLookup[video.pm_watched];
    const pMediaType = video.pm_media_type && mediaTypeLookup[video.pm_media_type];

    return (
        <div ref={ref} className='video-list-item'>
            <div className='video-name'onClick={() => addIdToParams(video.id)}>{ video.title }</div>
            <div className='sub-info'>
                <span className='category'>{category}</span>
                {video.length_mins && <span> | {video.length_mins} mins</span>}
                {video.watched && <span> | watched: {watchedStatus}</span>}
                {video.to_watch_priority && <span> | to Watch Priority: {video.to_watch_priority}</span>}
                <span> | {pMediaType} ({pmWatchedStatus})</span>
                {video.tags && <span> | {video.tags}</span>}
            </div>
        </div>
    );
});
