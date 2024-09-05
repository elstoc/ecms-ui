import React, { forwardRef, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VideoSummaryAndPrimaryMedium } from '../api';
import { useGetLookup } from '../hooks/useVideoDbQueries';

import './VideoListItem.scss';
import { Card, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

type VideoDbProps = {
    apiPath: string;
    video: VideoSummaryAndPrimaryMedium;
}

export const VideoListItem = forwardRef<HTMLDivElement, VideoDbProps>(({ apiPath, video }, ref): ReactElement => {
    const [searchParams] = useSearchParams();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');

    const watchedColorLookup = {
        'Y': 'green',
        'N': 'crimson',
        'P': 'orange',
        ' ': 'white'
    } as { [key: string]: string };

    const category = categoryLookup[video.category];
    const pMediaType = video.primary_media_type && mediaTypeLookup[video.primary_media_type];

    return (
        <Card ref={ref} className='video-list-item'>
            <Link className='video-name' to={`./${video.id}?${searchParams.toString()}`}>{ video.title }</Link>
            <div className='sub-info'>
                <span className='category'>{category}</span>
                {video.length_mins && <span> ({video.length_mins} mins) </span>}
                <span> <Icon icon='record' size={20} color={watchedColorLookup[video.watched ?? ' ']} /></span>
                <span><Icon icon='record' size={20} color={watchedColorLookup[video.primary_media_watched ?? ' ']} /> </span>
                <span> {pMediaType} </span>
                {video.tags && <span> <Icon icon='minus' size={20} /> {video.tags.replace(',', ', ')}</span>}
            </div>
        </Card>
    );
});
