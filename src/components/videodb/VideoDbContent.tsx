import React, { FC, ReactElement } from 'react';

import { VideoListItem } from './VideoListItem';
import { VideoWithId } from '../../types/VideoDb';

type VideoDbContentProps = {
    videos: VideoWithId[];
}

export const VideoDbContent: FC<VideoDbContentProps> = ({ videos }): ReactElement => {
    return (
        <div className='videodb-content'>
            {videos?.map((video) => <VideoListItem key={video.id}  video={video} />)}
        </div>
    );
};
