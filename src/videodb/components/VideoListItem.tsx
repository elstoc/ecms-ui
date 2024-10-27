import React, { forwardRef, ReactElement, useContext, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Collapse, Tag } from '@blueprintjs/core';

import { useLookupValue, usePatchVideo } from '../hooks/useVideoDbQueries';
import { useGetUserIsAdmin } from '../../auth/hooks/useAuthQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { VideoWithId } from '../api';

import { Flag } from '../../shared/components/forms';
import { Icon } from '../../shared/components/icon';
import { WatchedIcon } from './WatchedIcon';

import './VideoListItem.scss';

export const VideoListItem = forwardRef<HTMLDivElement, { video: VideoWithId }>(({ video }, ref): ReactElement => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userIsAdmin = useGetUserIsAdmin();
    const [viewExpanded, setViewExpanded] = useState(false);
    const { videoDbState: { apiPath } } = useContext(VideoDbStateContext);
    const { mutate, isPending } = usePatchVideo(apiPath, video.id, 'flag updated');

    const videoCategory = useLookupValue(apiPath, 'categories', video.category);
    const primaryMediaType = useLookupValue(apiPath, 'media_types', video.primary_media_type);
    const otherMediaType = useLookupValue(apiPath, 'media_types', video.other_media_type);
    const primaryMediaLocation = useLookupValue(apiPath, 'media_locations', video.primary_media_location);
    const otherMediaLocation = useLookupValue(apiPath, 'media_locations', video.other_media_location);
    const tagArray = video.tags?.split('|') || [];

    let lengthText = '';
    if (video.num_episodes && video.length_mins) {
        lengthText = `(${video.num_episodes} x ${video.length_mins} mins)`;
    } else if (video.length_mins) {
        lengthText = `(${video.length_mins} mins)`;
    } else if (video.num_episodes) {
        lengthText = `(${video.num_episodes} episodes)`;
    }

    const preventCardClick = (e: React.MouseEvent) => e.stopPropagation();
    const openVideo = () => navigate(`./${video.id}?${searchParams.toString()}`);
    const togglePriorityFlag = (checked: boolean) => mutate({ id: video.id, priority_flag: checked ? 1 : 0 });

    return (
        <Card
            ref={ref}
            className={`video-list-item ${viewExpanded ? 'expanded' : ''}`}
            onClick={() => setViewExpanded((prev) => !prev)}
        >
            <div className='primary-info'>
                <div className='left'>
                    <div className='video-title'>{video.title}</div>
                    <div>
                        <WatchedIcon watchedStatus={video.watched} />
                        <WatchedIcon watchedStatus={video.primary_media_watched} />
                        <span> {primaryMediaType} {lengthText}</span>
                    </div>
                </div>
                <div className='right' onClick={preventCardClick}>
                    <Flag
                        value={isPending ? undefined : ( video.priority_flag ? true : false )}
                        className='priority'
                        color='green'
                        onValueChange={!userIsAdmin ? undefined : togglePriorityFlag}
                    />
                </div>
            </div>
            <Collapse isOpen={viewExpanded}>
                <div className='secondary-info'>
                    <div className='left'>
                        <div className='tags'>
                            <Tag key='category'>{videoCategory}</Tag>
                            {tagArray.map((tagName) => (
                                <Tag key={tagName} minimal={true}>{tagName}</Tag>
                            ))}
                        </div>
                        <div className='media'>
                            <div><strong>Location:</strong> {primaryMediaLocation}</div>
                            {otherMediaType &&
                                <div><strong>Other Media: </strong>{otherMediaType} ({otherMediaLocation})</div>}
                            {video.media_notes &&
                                <div><strong>Notes:</strong> {video.media_notes}</div>}
                        </div>
                    </div>
                    <div className='right' onClick={preventCardClick}>
                        {userIsAdmin &&
                            <Icon name='edit' color='black' onClick={openVideo} />}
                    </div>
                </div>
            </Collapse>
        </Card>
    );
});
