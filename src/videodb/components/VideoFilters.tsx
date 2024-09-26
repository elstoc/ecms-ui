import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearFilterParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue, Switch, SegmentedControlInput } from '../../common/components/forms';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

const minResolutionOptions = [
    { label: 'SD', value: 'SD' },
    { label: 'HD', value: 'HD' },
    { label: 'UHD', value: 'UHD' }
];

const watchedStatusOptions = [
    { label: 'Any', value: 'Any' },
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
];

export const VideoFilters: FC = (): ReactElement => {
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const clearFilterParams = useClearFilterParams();
    const {
        state: {
            apiPath,
            filters: {
                titleContains, maxLength, categories, watched, mediaWatched,
                minResolution, tags, sortPriorityFirst
            },
        },
        stateReducer,
    } = useContext(VideoDbContext);

    const categoryLookup = useGetLookup(apiPath, 'categories');

    return (
        <div className='video-filters'>
            <Card className='card'>
                <MultiSelectKeyValue
                    label='Categories'
                    inline={true}
                    allItems={categoryLookup}
                    selectedKeys={categories ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <NullableIntInput
                    label='Max Length' 
                    className='max-length'
                    inline={true}
                    value={maxLength}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <SegmentedControlInput
                    label='Min Resolution'
                    inline={true}
                    options={minResolutionOptions}
                    value={minResolution || 'SD'}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'minResolution', value })}
                />
                <SegmentedControlInput
                    label='Watched'
                    inline={true}
                    options={watchedStatusOptions}
                    value={watched ?? 'Any'}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'watched', value })}
                />
                <SegmentedControlInput
                    label='Media Watched'
                    inline={true}
                    options={watchedStatusOptions}
                    value={mediaWatched ?? 'Any'}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'mediaWatched', value })}
                />
                <TagInput
                    label='Tags'
                    className='tags'
                    inline={true}
                    tags={tags ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                />
                <NullableStringInput
                    label='Title Search'
                    inline={true}
                    value={titleContains}
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
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
