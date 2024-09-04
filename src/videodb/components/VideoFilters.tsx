import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue } from '../../common/components/forms';
import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearSearchParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import './VideoFilters.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { TagInput } from './TagInput';

export const VideoFilters: FC = (): ReactElement => {
    const [searchParams] = useSearchParams();
    const { state: { apiPath, filters: { titleContains, maxLength, categories, watchedStatuses, pmWatchedStatuses, primaryMediaTypes, tags } }, stateReducer } = useContext(VideoDbContext);
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');
    const clearSearchParams = useClearSearchParams();

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableIntInput
                    value={maxLength}
                    inline={true}
                    label='Shorter Than' 
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <NullableStringInput
                    value={titleContains}
                    inline={true}
                    label='Title Contains'
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <MultiSelectKeyValue
                    allItems={categoryLookup}
                    inline={true}
                    selectedKeys={categories ?? []}
                    label='Categories'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <MultiSelectKeyValue
                    allItems={watchedStatusLookup}
                    inline={true}
                    selectedKeys={watchedStatuses ?? []}
                    label='Watched'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'watchedStatuses', value })}
                />
                <MultiSelectKeyValue
                    allItems={mediaTypeLookup}
                    inline={true}
                    selectedKeys={primaryMediaTypes ?? []}
                    label='Media Type'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'primaryMediaTypes', value })}
                />
                <MultiSelectKeyValue
                    allItems={watchedStatusLookup}
                    inline={true}
                    selectedKeys={pmWatchedStatuses ?? []}
                    label='Media Watched'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'pmWatchedStatuses', value })}
                />
                <TagInput
                    tags={tags ?? []}
                    inline={true}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                    label='Tags'
                    className='tags'
                />
                <div className='action-buttons'>
                    <Button onClick={clearSearchParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
            <div className='action-buttons'>
                <Link to={`./add?${searchParams.toString()}`}><Button>Add New Video</Button></Link>
            </div>
        </div>
    );
};
