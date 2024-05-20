import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import './VideoQueryParams.scss';
import { toIntOrUndefined } from '../../utils/toIntOrUndefined';
import { OptionalIntInput } from '../shared/OptionalIntInput';
import { OptionalStringInput } from '../shared/OptionaStringInput';
import { OptionalMultiSelectLookup } from '../shared/OptionalMultiSelectLookup';
import { useVideoDbLookup } from '../../hooks/useApiQueries';

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');
    const [searchParams, setSearchParams] = useSearchParams();
    const [maxLength, setMaxLength] = useState(toIntOrUndefined(searchParams.get('maxLength') || undefined));
    const [titleLike, setTitleLike] = useState(searchParams.get('titleLike') || undefined);
    const [selectedCategories, setSelectedCategories] = useState(searchParams.get('categories')?.split('|') || undefined);

    const setQueryParams = useCallback(() => {
        setSearchParams((params) => {
            params.delete('id');
            maxLength ? params.set('maxLength', maxLength.toString()) : params.delete('maxLength');
            titleLike ? params.set('titleLike', titleLike) : params.delete('titleLike');
            selectedCategories && selectedCategories.length > 0 ? params.set('categories', selectedCategories.join('|')) : params.delete('categories');
            return params;
        });
    }, [maxLength, setSearchParams, titleLike, selectedCategories]);

    return (
        <div className='video-query-params'>
            <h1>Video Query Params</h1>
            <OptionalIntInput value={toIntOrUndefined(maxLength?.toString())} onValueChange={(value) => setMaxLength(value)} defaultValue={999} label='Shorter Than'/>
            <OptionalStringInput value={titleLike} onValueChange={(value) => setTitleLike(value)} defaultValue='%%' label='Title Contains' />
            <OptionalMultiSelectLookup allItems={categoryLookup} selectedKeys={selectedCategories} label='Categories' onSelectionChange={(selectedItems) => setSelectedCategories(selectedItems)}/>
            <Button onClick={setQueryParams}>Submit</Button>
        </div>
    );
};
