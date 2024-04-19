import React, { FC, ReactElement } from 'react';
import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { HandleQueryState } from '../utils/HandleQueryState';
import { Helmet } from 'react-helmet';

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
                <div>{JSON.stringify(videos)}</div>
            </HandleQueryState>
        </>
    );
};
