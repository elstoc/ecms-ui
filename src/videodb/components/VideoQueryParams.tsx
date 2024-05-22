import React, { FC, ReactElement, useContext } from 'react';
import { Button } from '@blueprintjs/core';

import { OptionalIntInput, OptionalStringInput, MultiSelectKeyValue } from '../../common/components/forms';
import { useVideoDbLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from './VideoDb';

import './VideoQueryParams.scss';

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const { queryState, queryStateReducer, updateSearchParamsFromState, clearAll } = useContext(VideoDbContext);
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');

    return (
        <div className='video-query-params'>
            <OptionalIntInput
                value={queryState.maxLength}
                label='Shorter Than' 
                onValueChange={(value) => queryStateReducer({ action: 'set', key: 'maxLength', value })}
            />
            <OptionalStringInput
                value={queryState.titleContains}
                label='Title Contains'
                placeholder='Use % as wildcard'
                onValueChange={(value) => queryStateReducer({ action: 'set', key: 'titleContains', value })}
            />
            <MultiSelectKeyValue
                allItems={categoryLookup}
                selectedKeys={queryState.categories ?? []}
                label='Categories'
                onSelectionChange={(value) => queryStateReducer({ action: 'set', key: 'categories', value })}
            />
            <Button onClick={clearAll}>Clear All</Button>
            <Button onClick={updateSearchParamsFromState}>Submit</Button>
        </div>
    );
};
