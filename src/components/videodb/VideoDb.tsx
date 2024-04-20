import React, { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { HandleQueryState } from '../utils/HandleQueryState';
import { VideoListItem } from './VideoListItem';

import './VideoListItem.scss';

type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDb: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    const [ queryState, videos ] = useVideoDbVideos(apiPath);

    return (
        <>
            <Helmet><title>{title}</title></Helmet>
            <HandleQueryState {...queryState}>
                {videos?.map((video) => <VideoListItem key={video.id}  video={video} />)}
            </HandleQueryState>
        </>
    );
};
