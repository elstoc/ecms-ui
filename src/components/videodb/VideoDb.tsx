import React, { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { HandleQueryState } from '../utils/HandleQueryState';
import { VideoDbContent } from './VideoDbContent';

import './VideoListItem.scss';

type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDb: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    const [ queryState, videos ] = useVideoDbVideos(apiPath);

    return (
        <div className='videodb'>
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                {videos && <VideoDbContent videos={videos} />}
            </HandleQueryState>
        </div>
    );
};
