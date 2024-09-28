import React, { FC, ReactElement } from 'react';
import { Icon } from '../icon';

import './Flag.scss';

type FlagParams = {
    label?: string;
    value: boolean;
    inline?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
    color?: string;
}

export const Flag: FC<FlagParams> = ({ value, onValueChange, label, inline, className = '', color }): ReactElement => {
    return (
        <Icon
            onClick={onValueChange && (() => onValueChange(!value))}
            className={`flag-component ${className}`}
            name='flag'
            color={`${value ? (color || 'firebrick') : 'lightgrey'}`}
        />
    );
};
