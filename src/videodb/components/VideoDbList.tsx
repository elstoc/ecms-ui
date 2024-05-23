import React, { FC, ReactElement, useContext } from 'react';

import { VideoListItem } from './VideoListItem';
import { useVideoDbVideos } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useGetFilterSearchParams } from '../hooks/useVideoDbState';

export const VideoDbList: FC = (): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const getFilterSearchParams = useGetFilterSearchParams();
    const videos = useVideoDbVideos(apiPath, getFilterSearchParams());

    return (
        <div className='videodb-list'>
            {videos.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
