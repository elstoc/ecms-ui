import React, { FC, ReactElement, Suspense } from 'react';

import { VideoDbList } from './VideoDbList';
import { VideoDbFilters } from './VideoDbFilters';
import { ViewEditVideo } from './ViewEditVideo';
import { useTitle } from '../../common/hooks';
import { useUpdateStateOnSearchParamChange } from '../hooks/useVideoDbState';

export type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDbContent: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    useUpdateStateOnSearchParamChange();
    useTitle(title);
    return (
        <div className='videodb'>
            <Suspense fallback='Loading...'>
                <ViewEditVideo apiPath={apiPath} />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoDbFilters apiPath={apiPath} />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoDbList apiPath={apiPath} />
            </Suspense>
        </div>
    );
};
