import React, { FC, ReactElement } from 'react';
import { Icon } from '../icon';

import './Flag.scss';

type FlagParams = {
    value: boolean | undefined;
    onValueChange?: (value: boolean) => void;
    className?: string;
    color?: string;
}

export const Flag: FC<FlagParams> = ({ value, onValueChange, className = '', color }): ReactElement => {
    let calculatedColor = color || 'firebrick';
    if (value === false) {
        calculatedColor = 'lightgrey';
    } else if (value === undefined) {
        calculatedColor = 'orange';
    }

    return (
        <Icon
            onClick={onValueChange && (() => onValueChange(!value))}
            className={`flag-component ${value === false ? '' : 'checked'} ${className}`}
            name='flag'
            color={calculatedColor}
        />
    );
};
