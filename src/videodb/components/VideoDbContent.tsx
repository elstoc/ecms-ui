import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { VideoDbList } from './VideoDbList';
import { VideoDbFilters } from './VideoDbFilters';
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
