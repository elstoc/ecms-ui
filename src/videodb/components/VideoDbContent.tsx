import React, { FC, ReactElement, Suspense } from 'react';

import { VideoDbList } from './VideoDbList';
import { VideoQueryParams } from './VideoQueryParams';
import { ViewEditVideo } from './ViewEditVideo';
import { useTitle } from '../../common/hooks';

export type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDbContent: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    useTitle(title);
    return (
        <div className='videodb'>
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
