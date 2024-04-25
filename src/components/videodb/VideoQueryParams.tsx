import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, FocusStyleManager } from '@blueprintjs/core';

import './VideoQueryParams.scss';
import { toIntOrUndefined } from '../../utils/toIntOrUndefined';
import { OptionalIntInput } from '../general/OptionalIntInput';

FocusStyleManager.onlyShowFocusOnTabs();

export const VideoQueryParams: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [maxLength, setMaxLength] = useState(toIntOrUndefined(searchParams.get('maxLength') || undefined));

    const setQueryParams = useCallback(() => {
        const newParams: { [key: string]: string } = { };
        if (maxLength) {
            newParams['maxLength'] = maxLength.toString();
        }
        setSearchParams(newParams, {replace: true});
    }, [maxLength, setSearchParams]);

    return (
        <div className='video-query-params'>
            <h1>Some Query Params Here</h1>
            <OptionalIntInput value={toIntOrUndefined(maxLength?.toString())} onValueChange={(value) => setMaxLength(value)} defaultValue={999} label='Max Length'/>
            <Button onClick={setQueryParams}>Submit</Button>
        </div>
    );
};
