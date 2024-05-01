import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { HandleQueryState } from '../utils/HandleQueryState';
import { VideoDbList } from './VideoDbList';
import { VideoQueryParams } from './VideoQueryParams';

type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDb: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    const [searchParams] = useSearchParams();
    const { maxLength, titleLike, categories } = Object.fromEntries([...searchParams]);

    const videoQueryParams: { [key: string]: string } = {};
    if (maxLength !== undefined) {
        videoQueryParams.maxLength = maxLength;
    }
    if (titleLike !== undefined) {
        videoQueryParams.titleLike = titleLike;
    }
    if (categories !== undefined) {
        videoQueryParams.categories = categories;
    }
    const [ queryState, videos ] = useVideoDbVideos(apiPath, videoQueryParams);

    return (
        <div className='videodb'>
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                <VideoQueryParams apiPath={apiPath} />
                {videos && <VideoDbList videos={videos} apiPath={apiPath} />}
            </HandleQueryState>
        </div>
    );
};
