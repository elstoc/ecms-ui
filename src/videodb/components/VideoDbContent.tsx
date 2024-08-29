import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { VideoList } from './VideoList';
import { VideoFilters } from './VideoFilters';
import { UpdateVideo } from './UpdateVideo';
import { useTitle } from '../../common/hooks';
import { VideoDbContext, useUpdateStateOnSearchParamChange } from '../hooks/useVideoDbState';
import { ContentWithSidebar } from '../../common/components/layout';
import { useSearchParams } from 'react-router-dom';

export const VideoDbContent: FC = (): ReactElement => {
    const { state: { title } } = useContext(VideoDbContext);
    const [ searchParams ] = useSearchParams();
    const id = parseInt(searchParams.get('id') || '');
    useUpdateStateOnSearchParamChange();
    useTitle(title);

    const videoFiltersElement = (
        <Suspense fallback='Loading...'>
            <VideoFilters />
        </Suspense>
    );

    const videoListElement = (
        <Suspense fallback='Loading...'>
            <VideoList />
        </Suspense>
    );

    return (
        <>
            <Suspense fallback='Loading...'>
                {id > 0 && <UpdateVideo id={id} />}
            </Suspense>
            <ContentWithSidebar
                mainPageElement={videoListElement}
                sidebarElement={videoFiltersElement}
                mobileSidebarAtTop={true}
            />
        </>
    );
};
