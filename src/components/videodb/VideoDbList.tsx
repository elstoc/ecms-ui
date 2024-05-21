import React, { FC, ReactElement, useContext } from 'react';

import { VideoListItem } from './VideoListItem';
import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { VideoDbQueryParamContext } from './VideoDb';

type VideoDbContentProps = {
    apiPath: string;
}

export const VideoDbList: FC<VideoDbContentProps> = ({ apiPath }): ReactElement => {
    const { querySearchParams } = useContext(VideoDbQueryParamContext);
    const videos = useVideoDbVideos(apiPath, querySearchParams);

    return (
        <div className='videodb-list'>
            {videos?.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
