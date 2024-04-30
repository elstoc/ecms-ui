import React, { FC, ReactElement } from 'react';

import { VideoWithId } from '../../types/VideoDb';

import './VideoListItem.scss';

type VideoDbProps = {
    video: VideoWithId;
}

export const VideoListItem: FC<VideoDbProps> = ({ video }): ReactElement => {
    return (
        <div className='video-list-item'>
            <div className='video-name'>{ video.title }</div>
            <div className='sub-info'>
                <span className='category'>{video.category}</span>
                {video.length_mins > 0 && <span> | {video.length_mins} mins</span>}
            </div>
        </div>
    );
};
