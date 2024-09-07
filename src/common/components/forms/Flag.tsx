import React, { FC, ReactElement } from 'react';
import { FormGroup, Icon } from '@blueprintjs/core';

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
        <FormGroup
            label={label}
            inline={inline}
            className={className}
        >
            <div onClick={() => onValueChange?.(!value)}>
                <Icon icon='flag' color={`${value ? (color || 'firebrick') : 'lightgrey'}`} />
            </div>
        </FormGroup>
    );
};
