import React, { FC, ReactElement } from 'react';
import { FormGroup, NumericInput } from '@blueprintjs/core';

type NullableIntInputParams = {
    value: number | null;
    onValueChange?: (value: number | null) => void;
    label: string;
    placeholder?: string;
    inline?: boolean;
};

export const NullableIntInput: FC<NullableIntInputParams> = ({ value, onValueChange, label, placeholder, inline }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline}>
            <NumericInput
                value={value == null ? NumericInput.VALUE_EMPTY : value}
                fill={true}
                buttonPosition='none'
                placeholder={placeholder}
                onValueChange={(num, str) => onValueChange?.(str === NumericInput.VALUE_EMPTY ? null : parseInt(str))}
            />
        </FormGroup>
    );
};
