import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { VideoDbList } from './VideoDbList';
import { VideoDbFilters } from './VideoDbFilters';
import { ViewEditVideo } from './ViewEditVideo';
import { useTitle } from '../../common/hooks';
import { VideoDbContext, useUpdateStateOnSearchParamChange } from '../hooks/useVideoDbState';
import { ContentWithSidebar } from '../../common/components/layout';

export const VideoDbContent: FC = (): ReactElement => {
    const { state: { title } } = useContext(VideoDbContext);
    useUpdateStateOnSearchParamChange();
    useTitle(title);

    const videoFiltersElement = (
        <Suspense fallback='Loading...'>
            <VideoDbFilters />
        </Suspense>
    );

    const videoListElement = (
        <Suspense fallback='Loading...'>
            <VideoDbList />
        </Suspense>
    );

    return (
        <>
            <Suspense fallback='Loading...'>
                <ViewEditVideo />
            </Suspense>
            <ContentWithSidebar
                mainPageElement={videoListElement}
                sidebarElement={videoFiltersElement}
                mobileSidebarAtTop={true}
            />
        </>
    );
};
