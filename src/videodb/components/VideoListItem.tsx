import React, { forwardRef, ReactElement, useContext, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Collapse, Icon as BPIcon } from '@blueprintjs/core';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { VideoWithId } from '../api';

import { Flag } from '../../common/components/forms';
import { Icon } from '../../common/components/icon';

import './VideoListItem.scss';

type VideoDbProps = {
    apiPath: string;
    video: VideoWithId;
}

const watchedColorLookup = {
    'Y': 'green',
    'N': 'crimson',
    'P': 'orange',
    ' ': 'white'
} as { [key: string]: string };

export const VideoListItem = forwardRef<HTMLDivElement, VideoDbProps>(({ apiPath, video }, ref): ReactElement => {
    const { state: { pendingFlagUpdates }, stateReducer } = useContext(VideoDbContext);
    const navigate = useNavigate();
    const [expandedView, setExpandedView] = useState(false);
    const expandedClass = expandedView ? 'expanded' : '';

    const [searchParams] = useSearchParams();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');
    const locationLookup = useGetLookup(apiPath, 'media_locations');

    const category = categoryLookup[video.category];
    const pMediaType = mediaTypeLookup[video.primary_media_type ?? ''];

    let prioritySwitchChecked = (video.to_watch_priority ?? 0) > 0;
    if (video.id in pendingFlagUpdates) {
        prioritySwitchChecked = pendingFlagUpdates[video.id] === 1;
    }

    return (
        <Card
            ref={ref}
            className={`video-list-item ${expandedClass}`}
            onClick={() => setExpandedView((prev) => !prev)}
        >
            <div className='primary-info'>
                <div className='left'>
                    <div className='video-name'>
                        <div>{video.title} </div>
                    </div>
                    <div className='sub-info'>
                        <span className='category'>{category}</span>
                        {video.length_mins && <span> ({video.length_mins} mins) </span>}
                        <span> <BPIcon icon='record' size={20} color={watchedColorLookup[video.watched ?? ' ']} /></span>
                        <span><BPIcon icon='record' size={20} color={watchedColorLookup[video.primary_media_watched ?? ' ']} /></span>
                        <span> {pMediaType}</span>
                    </div>
                </div>
                <div className='right' onClick={(e) => e.stopPropagation()}>
                    <Flag
                        value={prioritySwitchChecked}
                        color='green'
                        className={`priority ${prioritySwitchChecked ? '' : 'unchecked'}`}
                        onValueChange={(checked) => stateReducer({ action: 'setUpdatedFlag', videoId: video.id, currValue: video.to_watch_priority, newValue: checked ? 1 : 0 })}
                    />
                </div>
            </div>
            <Collapse isOpen={expandedView}>
                <div className='secondary-info'>
                    <div className='left'>
                        <div><strong>Location:</strong> {locationLookup[video.primary_media_location ?? '']}</div>
                        {video.other_media_location && <div><strong>Other Media: </strong> {mediaTypeLookup[video.other_media_type ?? '']} ({locationLookup[video.other_media_location ?? '']})</div>}
                        {video.media_notes && <div><strong>Notes:</strong> {video.media_notes}</div>}
                        {video.tags && <div><strong>Tags:</strong> {video.tags.replaceAll('|', ', ')}</div>}
                    </div>
                    <div className='right' onClick={(e) => e.stopPropagation()}>
                        <Icon
                            name='edit'
                            className='icon'
                            color='black'
                            onClick={() => navigate(`./${video.id}?${searchParams.toString()}`)}
                        />
                    </div>
                </div>
            </Collapse>
        </Card>
    );
});
