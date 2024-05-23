import React, { FC, ReactElement } from 'react';

import { VideoListItem } from './VideoListItem';
import { useVideoDbVideos } from '../hooks/useVideoDbQueries';
import { useGetFilterSearchParams } from '../hooks/useVideoDbState';

type VideoDbContentProps = {
    apiPath: string;
}

export const VideoDbList: FC<VideoDbContentProps> = ({ apiPath }): ReactElement => {
    const getFilterSearchParams = useGetFilterSearchParams();
    const videos = useVideoDbVideos(apiPath, getFilterSearchParams());

    return (
        <div className='videodb-list'>
            {videos.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
