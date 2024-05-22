import React, { FC, ReactElement, useContext } from 'react';
import { Button } from '@blueprintjs/core';

import { OptionalIntInput } from '../../common/components/forms/OptionalIntInput';
import { OptionalStringInput } from '../../common/components/forms/OptionaStringInput';
import { MultiSelectKeyValue } from '../../common/components/forms/MultiSelectKeyValue';
import { useVideoDbLookup } from '../hooks/useVideoDbQueries';
import { VideoDbQueryParamContext } from './VideoDb';

import './VideoQueryParams.scss';

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const { queryState, queryStateReducer, updateSearchParamsFromState, clearAll } = useContext(VideoDbQueryParamContext);
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
