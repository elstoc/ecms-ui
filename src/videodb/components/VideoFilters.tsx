import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card, Divider, Radio, RadioGroup } from '@blueprintjs/core';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearFilterParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue, Switch } from '../../common/components/forms';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

export const VideoFilters: FC = (): ReactElement => {
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const clearFilterParams = useClearFilterParams();
    const {
        state: {
            apiPath,
            filters: {
                titleContains, maxLength, categories, watchedStatuses,
                pmWatchedStatuses, minResolution, tags, sortPriorityFirst
            },
        },
        stateReducer,
    } = useContext(VideoDbContext);

    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableStringInput
                    label='Title Contains'
                    inline={true}
                    value={titleContains}
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <NullableIntInput
                    label='Shorter Than' 
                    inline={true}
                    value={maxLength}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <RadioGroup
                    label='Minimum Resolution'
                    inline={true}
                    selectedValue={minResolution || 'SD'}
                    onChange={(event) => stateReducer({ action: 'setFilter', key: 'minResolution', value: event.currentTarget.value })}
                >
                    <Radio label='SD' value='SD' />
                    <Radio label='HD' value='HD' />
                    <Radio label='UHD' value='UHD' />
                </RadioGroup>
                <MultiSelectKeyValue
                    label='Categories'
                    inline={true}
                    allItems={categoryLookup}
                    selectedKeys={categories ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <TagInput
                    label='Tags'
                    className='tags'
                    inline={true}
                    tags={tags ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                />
                <Divider />
                <MultiSelectKeyValue
                    label='Watched'
                    className='watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={watchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'watchedStatuses', value })}
                />
                <MultiSelectKeyValue
                    label='Media Watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={pmWatchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'pmWatchedStatuses', value })}
                />
                <Switch
                    label='Priority First'
                    inline={true}
                    value={sortPriorityFirst === 1}
                    onValueChange={(value) => stateReducer({action: 'setFilter', key: 'sortPriorityFirst', value: value ? 1 : 0})}
                />
                <div className='filter-action-buttons'>
                    <Button onClick={clearFilterParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
        </div>
    );
};
