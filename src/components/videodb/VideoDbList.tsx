import React, { FC, ReactElement } from 'react';

import { VideoListItem } from './VideoListItem';
import { useSearchParams } from 'react-router-dom';
import { useVideoDbVideos } from '../../hooks/useApiQueries';

type VideoDbContentProps = {
    apiPath: string;
}

export const VideoDbList: FC<VideoDbContentProps> = ({ apiPath }): ReactElement => {
    const [searchParams] = useSearchParams();
    const { maxLength, titleContains, categories } = Object.fromEntries([...searchParams]);

    const videoQueryParams: { [key: string]: string } = {};
    if (maxLength !== undefined) {
        videoQueryParams.maxLength = maxLength;
    }
    if (titleContains !== undefined) {
        videoQueryParams.titleContains = titleContains;
    }
    if (categories !== undefined) {
        videoQueryParams.categories = categories;
    }
    const videos = useVideoDbVideos(apiPath, videoQueryParams);

    return (
        <div className='videodb-list'>
            {videos?.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
