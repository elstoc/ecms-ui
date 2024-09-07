import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearSearchParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue, Switch } from '../../common/components/forms';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

export const VideoFilters: FC = (): ReactElement => {
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const clearSearchParams = useClearSearchParams();
    const {
        state: {
            apiPath,
            filters: {
                titleContains, maxLength, categories, watchedStatuses,
                pmWatchedStatuses, primaryMediaTypes, tags, sortPriorityFirst
            },
        },
        stateReducer,
    } = useContext(VideoDbContext);

    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableIntInput
                    label='Shorter Than' 
                    inline={true}
                    value={maxLength}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <NullableStringInput
                    label='Title Contains'
                    inline={true}
                    value={titleContains}
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <MultiSelectKeyValue
                    label='Categories'
                    inline={true}
                    allItems={categoryLookup}
                    selectedKeys={categories ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <MultiSelectKeyValue
                    label='Watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={watchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'watchedStatuses', value })}
                />
                <MultiSelectKeyValue
                    label='Media Type'
                    inline={true}
                    allItems={mediaTypeLookup}
                    selectedKeys={primaryMediaTypes ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'primaryMediaTypes', value })}
                />
                <MultiSelectKeyValue
                    label='Media Watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={pmWatchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'pmWatchedStatuses', value })}
                />
                <TagInput
                    label='Tags'
                    className='tags'
                    inline={true}
                    tags={tags ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                />
                <Switch
                    label='Priority First'
                    inline={true}
                    value={sortPriorityFirst === 1}
                    onValueChange={(value) => stateReducer({action: 'setFilter', key: 'sortPriorityFirst', value: value ? 1 : 0})}
                />
                <div className='filter-action-buttons'>
                    <Button onClick={clearSearchParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
        </div>
    );
};
