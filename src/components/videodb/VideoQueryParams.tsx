import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, FocusStyleManager } from '@blueprintjs/core';

import './VideoQueryParams.scss';
import { toIntOrUndefined } from '../../utils/toIntOrUndefined';
import { OptionalIntInput } from '../general/OptionalIntInput';
import { OptionalStringInput } from '../general/OptionaStringInput';
import { OptionalMultiSelectLookup } from '../general/OptionalMultiSelectLookup';
import { useVideoDbLookup } from '../../hooks/useApiQueries';

FocusStyleManager.onlyShowFocusOnTabs();

export const VideoQueryParams: FC<{ apiPath: string}> = ({ apiPath }): ReactElement => {
    const [, categoryLookup] = useVideoDbLookup(apiPath, 'categories');
    const [searchParams, setSearchParams] = useSearchParams();
    const [maxLength, setMaxLength] = useState(toIntOrUndefined(searchParams.get('maxLength') || undefined));
    const [titleLike, setTitleLike] = useState(searchParams.get('titleLike') || undefined);
    const [selectedCategories, setSelectedCategories] = useState(searchParams.get('categories')?.split('|') || undefined);

    const setQueryParams = useCallback(() => {
        const newParams: { [key: string]: string } = { };
        if (maxLength) {
            newParams['maxLength'] = maxLength.toString();
        }
        if (titleLike !== undefined) {
            newParams['titleLike'] = titleLike;
        }
        if (selectedCategories) {
            const categories = selectedCategories.join('|');
            if (categories.length > 0) {
                newParams['categories'] = categories;
            }
        }
        setSearchParams(newParams, {replace: true});
    }, [maxLength, setSearchParams, titleLike, selectedCategories]);

    return (
        <div className='video-query-params'>
            <h1>Video Query Params</h1>
            <OptionalIntInput value={toIntOrUndefined(maxLength?.toString())} onValueChange={(value) => setMaxLength(value)} defaultValue={999} label='Max Length'/>
            <OptionalStringInput value={titleLike} onValueChange={(value) => setTitleLike(value)} defaultValue='%%' label='Title' />
            <OptionalMultiSelectLookup allItems={categoryLookup} selectedKeys={selectedCategories} label='Categories' onSelectionChange={(selectedItems) => setSelectedCategories(selectedItems)}/>
            <Button onClick={setQueryParams}>Submit</Button>
        </div>
    );
};
