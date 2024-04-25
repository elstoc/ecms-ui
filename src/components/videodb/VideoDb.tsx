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
    const params = Object.fromEntries([...searchParams]);
    const [ queryState, videos ] = useVideoDbVideos(apiPath, params);

    return (
        <div className='videodb'>
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                <VideoQueryParams />
                {videos && <VideoDbList videos={videos} />}
            </HandleQueryState>
        </div>
    );
};
