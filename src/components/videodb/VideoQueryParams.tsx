import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import './VideoQueryParams.scss';
import { toIntOrUndefined } from '../../utils/toIntOrUndefined';
import { OptionalIntInput } from '../shared/forms/OptionalIntInput';
import { OptionalStringInput } from '../shared/forms/OptionaStringInput';
import { MultiSelectKeyValue } from '../shared/forms/MultiSelectKeyValue';
import { useVideoDbLookup } from '../../hooks/useApiQueries';

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');
    const [searchParams, setSearchParams] = useSearchParams();
    const [maxLength, setMaxLength] = useState(toIntOrUndefined(searchParams.get('maxLength') || undefined));
    const [titleContains, setTitleContains] = useState(searchParams.get('titleContains') || undefined);
    const [selectedCategories, setSelectedCategories] = useState(searchParams.get('categories')?.split('|') || []);

    const setQueryParams = useCallback(() => {
        setSearchParams((params) => {
            params.delete('id');
            maxLength ? params.set('maxLength', maxLength.toString()) : params.delete('maxLength');
            titleContains ? params.set('titleContains', `${titleContains}`) : params.delete('titleContains');
            selectedCategories && selectedCategories.length > 0 ? params.set('categories', selectedCategories.join('|')) : params.delete('categories');
            return params;
        });
    }, [maxLength, setSearchParams, titleContains, selectedCategories]);

    return (
        <div className='video-query-params'>
            <OptionalIntInput value={toIntOrUndefined(maxLength?.toString())} onValueChange={(value) => setMaxLength(value)} label='Shorter Than'/>
            <OptionalStringInput value={titleContains} onValueChange={(value) => setTitleContains(value)} placeholder='Use % as wildcard' label='Title Contains' />
            <MultiSelectKeyValue allItems={categoryLookup} selectedKeys={selectedCategories} label='Categories' onSelectionChange={(selectedItems) => setSelectedCategories(selectedItems)}/>
            <Button onClick={setQueryParams}>Submit</Button>
        </div>
    );
};
