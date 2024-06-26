import React, { FC, ReactElement, useContext } from 'react';
import { Button } from '@blueprintjs/core';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue } from '../../common/components/forms';
import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearSearchParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import './VideoDbFilters.scss';

export const VideoDbFilters: FC = (): ReactElement => {
    const { state: { apiPath, filters: { titleContains, maxLength, categories } }, stateReducer } = useContext(VideoDbContext);
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const clearSearchParams = useClearSearchParams();

    return (
        <div className='video-filters'>
            <NullableIntInput
                value={maxLength}
                label='Shorter Than' 
                onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
            />
            <NullableStringInput
                value={titleContains}
                label='Title Contains'
                placeholder='Use % as wildcard'
                onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
            />
            <MultiSelectKeyValue
                allItems={categoryLookup}
                selectedKeys={categories ?? []}
                label='Categories'
                onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
            />
            <Button onClick={clearSearchParams}>Clear All</Button>
            <Button onClick={setSearchParamsFromState}>Submit</Button>
        </div>
    );
};
