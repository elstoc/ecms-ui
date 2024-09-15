import React, { forwardRef, ReactElement, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, Icon } from '@blueprintjs/core';

import { VideoSummaryAndPrimaryMedium } from '../api';
import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

import { Flag } from '../../common/components/forms';

import './VideoListItem.scss';

type VideoDbProps = {
    apiPath: string;
    video: VideoSummaryAndPrimaryMedium;
}

const watchedColorLookup = {
    'Y': 'green',
    'N': 'crimson',
    'P': 'orange',
    ' ': 'white'
} as { [key: string]: string };

export const VideoListItem = forwardRef<HTMLDivElement, VideoDbProps>(({ apiPath, video }, ref): ReactElement => {
    const { state: { pendingFlagUpdates }, stateReducer } = useContext(VideoDbContext);
    const [searchParams] = useSearchParams();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');

    const category = categoryLookup[video.category];
    const pMediaType = mediaTypeLookup[video.primary_media_type ?? ''];

    let prioritySwitchChecked = (video.to_watch_priority ?? 0) > 0;
    if (video.id in pendingFlagUpdates) {
        prioritySwitchChecked = pendingFlagUpdates[video.id] === 1;
    }

    return (
        <Card ref={ref} className='video-list-item'>
            <div className='left'>
                <Link className='video-name' to={`./${video.id}?${searchParams.toString()}`}>{ video.title }</Link>
                <div className='sub-info'>
                    <span className='category'>{category}</span>
                    {video.length_mins && <span> ({video.length_mins} mins) </span>}
                    <span> <Icon icon='record' size={20} color={watchedColorLookup[video.watched ?? ' ']} /></span>
                    <span><Icon icon='record' size={20} color={watchedColorLookup[video.primary_media_watched ?? ' ']} /> </span>
                    <span> {pMediaType} </span>
                </div>
            </div>
            <div className='right'>
                <Flag
                    value={prioritySwitchChecked}
                    color='green'
                    className={`priority ${prioritySwitchChecked ? '' : 'unchecked'}`}
                    onValueChange={(checked) => stateReducer({ action: 'setUpdatedFlag', videoId: video.id, currValue: video.to_watch_priority, newValue: checked ? 1 : 0 })}
                />
            </div>
        </Card>
    );
});
