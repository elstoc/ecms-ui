import React, { FC, ReactElement } from 'react';
import { FormGroup, Icon } from '@blueprintjs/core';

import './Flag.scss';

type FlagParams = {
    label?: string;
    value: boolean;
    inline?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
    color?: string;
}

export const Flag: FC<FlagParams> = ({ value, onValueChange, label, inline, className, color }): ReactElement => {
    return (
        <div onClick={() => onValueChange?.(!value)}>
            <FormGroup
                label={label}
                inline={inline}
                className={`flag-component ${className}`}
            >
                <Icon icon='flag' size={18} color={`${value ? (color || 'firebrick') : 'lightgrey'}`} />
            </FormGroup>
        </div>
    );
};
