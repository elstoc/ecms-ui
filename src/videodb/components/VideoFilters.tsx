import React, { FC, ReactElement, useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue } from '../../common/components/forms';
import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearSearchParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';

import './VideoFilters.scss';
import { Link, useSearchParams } from 'react-router-dom';

export const VideoFilters: FC = (): ReactElement => {
    const [searchParams] = useSearchParams();
    const { state: { apiPath, filters: { titleContains, maxLength, categories } }, stateReducer } = useContext(VideoDbContext);
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const clearSearchParams = useClearSearchParams();

    return (
        <>
            <Card className='video-filters'>
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
                    placeholder='Use % as wildcard'
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <MultiSelectKeyValue
                    allItems={categoryLookup}
                    inline={true}
                    selectedKeys={categories ?? []}
                    label='Categories'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <div>
                    <Button onClick={clearSearchParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
            <div className='add-video-button'>
                <Link to={`./add?${searchParams.toString()}`}><Button>Add New Video</Button></Link>
            </div>
        </>
    );
};
