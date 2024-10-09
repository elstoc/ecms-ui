import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card, Drawer } from '@blueprintjs/core';
import { useMediaQuery } from 'react-responsive';

import { useVideoDbFilterState } from '../hooks/useVideoDbFilterState';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { NullableIntInput, NullableStringInput, Switch, SegmentedControlInput } from '../../common/components/forms';
import { NullableSelectLookup } from './NullableSelectLookup';
import { TagInput } from './TagInput';
import variables from '../../site/variables.module.scss';

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
    const { state, updateState, clearAllFilters } = useVideoDbFilterState();
    const { videoDbState: { navOpen }, videoDbReducer } = useContext(VideoDbStateContext);
    const { titleContains, maxLength, categories, watched, mediaWatched, minResolution, tags, sortPriorityFirst } = state;
    const isDualPanel = useMediaQuery({ query: `screen and (min-width: ${variables.minDualPanelWidth})` });

    const filtersElement = (
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
                    allowCreation={false}
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
                    <Button onClick={clearAllFilters}>Reset Filters</Button>
                    {!isDualPanel && <Button onClick={() => videoDbReducer({ action: 'setNavOpen', value: false })}>Close</Button>}
                </div>
            </Card>
        </div>
    );

    if (isDualPanel) {
        return filtersElement;
    }

    return (
        <Drawer
            isOpen={navOpen}
            onClose={() => videoDbReducer({ action: 'setNavOpen', value: false })}
            size='85%'
            position='left'
        >
            {filtersElement}
        </Drawer>
    );
};
