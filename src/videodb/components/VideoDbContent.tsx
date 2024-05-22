import React, { FC, ReactElement, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { VideoDbList } from './VideoDbList';
import { VideoQueryParams } from './VideoQueryParams';
import { ViewEditVideo } from './ViewEditVideo';

export type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDbContent: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    return (
        <div className='videodb'>
            <Helmet><title>{title}</title></Helmet>
            <Suspense fallback='Loading...'>
                <ViewEditVideo apiPath={apiPath} />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoQueryParams apiPath={apiPath} />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoDbList apiPath={apiPath} />
            </Suspense>
        </div>
    );
};
