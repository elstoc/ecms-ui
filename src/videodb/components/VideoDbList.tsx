import React, { FC, ReactElement, useContext } from 'react';

import { VideoListItem } from './VideoListItem';
import { useVideoDbVideos } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from './VideoDb';

type VideoDbContentProps = {
    apiPath: string;
}

export const VideoDbList: FC<VideoDbContentProps> = ({ apiPath }): ReactElement => {
    const { getQuerySearchParams } = useContext(VideoDbContext);
    const videos = useVideoDbVideos(apiPath, getQuerySearchParams());

    return (
        <div className='videodb-list'>
            {videos.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
