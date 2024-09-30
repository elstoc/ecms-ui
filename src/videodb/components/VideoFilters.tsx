import React, { FC, ReactElement, useCallback, useContext, useRef } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { SetFilterOperations, VideoDbContext, useClearFilterParams, useSearchParamsReducer } from '../hooks/useVideoDbState';

import { NullableIntInput, NullableStringInput, Switch, SegmentedControlInput } from '../../common/components/forms';
import { NullableSelectLookup } from './NullableSelectLookup';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

const minResolutionOptions = [
    { label: 'SD', value: 'SD' },
    { label: 'HD', value: 'HD' },
    { label: 'UHD', value: 'UHD' }
];

const watchedStatusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
];

export const VideoFilters: FC = (): ReactElement => {
    const searchParamsReducer = useSearchParamsReducer();
    const handlerRef = useRef<NodeJS.Timeout | null>(null);
    const clearFilterParams = useClearFilterParams();
    const { state: { filters }, stateReducer } = useContext(VideoDbContext);
    const { titleContains, maxLength, categories, watched, mediaWatched, minResolution, tags, sortPriorityFirst } = filters;

    const updateState = useCallback((operation: SetFilterOperations) => {
        stateReducer(operation);

        if (handlerRef.current) {
            clearTimeout(handlerRef.current);
            handlerRef.current = null;
        }

        const timeout = ['titleContains', 'maxLength'].includes(operation.key) ? 1000 : 10;

        handlerRef.current = setTimeout(() => {
            searchParamsReducer(operation);
        }, timeout);
    }, [searchParamsReducer, stateReducer]);

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableSelectLookup
                    label='Category'
                    className='category'
                    lookupTable='categories'
                    inline={true}
                    selectedKey={categories}
                    onSelectionChange={(value) => updateState({ action: 'setFilter', key: 'categories', value })}
                    nullValueRepr='All'
                    filterable={false}
                />
                <SegmentedControlInput
                    label='Min Resolution'
                    inline={true}
                    options={minResolutionOptions}
                    value={minResolution || 'SD'}
                    onValueChange={(value) => updateState({ action: 'setFilter', key: 'minResolution', value })}
                />
                <SegmentedControlInput
                    label='Watched'
                    inline={true}
                    options={watchedStatusOptions}
                    value={watched ?? 'All'}
                    onValueChange={(value) => updateState({ action: 'setFilter', key: 'watched', value })}
                />
                <SegmentedControlInput
                    label='Media Watched'
                    inline={true}
                    options={watchedStatusOptions}
                    value={mediaWatched ?? 'All'}
                    onValueChange={(value) => updateState({ action: 'setFilter', key: 'mediaWatched', value })}
                />
                <NullableIntInput
                    label='Max Length' 
                    className='max-length'
                    inline={true}
                    value={maxLength}
                    onValueChange={(value) => updateState({ action: 'setFilter', key: 'maxLength', value })}
                />
                <TagInput
                    label='Tags'
                    className='tags'
                    inline={true}
                    tags={tags}
                    onSelectionChange={(value) => updateState({ action: 'setFilter', key: 'tags', value })}
                />
                <NullableStringInput
                    label='Title Search'
                    inline={true}
                    value={titleContains}
                    placeholder=''
                    onValueChange={(value) => updateState({ action: 'setFilter', key: 'titleContains', value })}
                />
                <Switch
                    label='Priority First'
                    className='priority'
                    inline={true}
                    value={sortPriorityFirst === 1}
                    onValueChange={(value) => updateState({action: 'setFilter', key: 'sortPriorityFirst', value: value ? 1 : 0})}
                />
                <div className='filter-action-buttons'>
                    <Button onClick={clearFilterParams}>Reset Filters</Button>
                </div>
            </Card>
        </div>
    );
};
