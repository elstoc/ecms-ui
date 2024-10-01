import React, { FC, ReactElement } from 'react';
import { Icon } from '../icon';

import './Flag.scss';

type FlagParams = {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
    color?: string;
}

export const Flag: FC<FlagParams> = ({ value, onValueChange, className = '', color }): ReactElement => {
    return (
        <Icon
            onClick={onValueChange && (() => onValueChange(!value))}
            className={`flag-component ${value ? 'checked' : ''} ${className}`}
            name='flag'
            color={`${value ? (color || 'firebrick') : 'lightgrey'}`}
        />
    );
};
