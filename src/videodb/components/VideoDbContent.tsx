import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { VideoDbList } from './VideoDbList';
import { VideoDbFilters } from './VideoDbFilters';
import { ViewEditVideo } from './ViewEditVideo';
import { useTitle } from '../../common/hooks';
import { VideoDbContext, useUpdateStateOnSearchParamChange } from '../hooks/useVideoDbState';

export const VideoDbContent: FC = (): ReactElement => {
    const { state: { title } } = useContext(VideoDbContext);
    useUpdateStateOnSearchParamChange();
    useTitle(title);
    return (
        <div className='videodb'>
            <Suspense fallback='Loading...'>
                <ViewEditVideo />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoDbFilters />
            </Suspense>
            <Suspense fallback='Loading...'>
                <VideoDbList />
            </Suspense>
        </div>
    );
};
