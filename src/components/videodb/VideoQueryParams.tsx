import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { Button } from '@blueprintjs/core';

import { OptionalIntInput } from '../shared/forms/OptionalIntInput';
import { OptionalStringInput } from '../shared/forms/OptionaStringInput';
import { MultiSelectKeyValue } from '../shared/forms/MultiSelectKeyValue';
import { useVideoDbLookup } from '../../hooks/useApiQueries';
import { VideoDbQueryParamContext } from './VideoDb';

import './VideoQueryParams.scss';

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const { queryState, queryStateReducer, updateSearchParamsFromState, clearAll } = useContext(VideoDbQueryParamContext);
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');

    const setQueryParams = useCallback(() => updateSearchParamsFromState(), [updateSearchParamsFromState]);
    const clearQueryParams = useCallback(() => clearAll(), [clearAll]);

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
            <Button onClick={clearQueryParams}>Clear All</Button>
            <Button onClick={setQueryParams}>Submit</Button>
        </div>
    );
};
