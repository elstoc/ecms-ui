import React, { FC, ReactElement } from 'react';
import { FormGroup, NumericInput } from '@blueprintjs/core';

type OptionalIntInputParams = {
    value?: number;
    onValueChange?: (value?: number) => void;
    label: string;
    placeholder?: string;
};

export const OptionalIntInput: FC<OptionalIntInputParams> = ({ value, onValueChange, label, placeholder }): ReactElement => {
    return (
        <FormGroup label={label} inline={true}>
            <NumericInput
                value={value === undefined ? NumericInput.VALUE_EMPTY : value}
                buttonPosition='none'
                placeholder={placeholder}
                onValueChange={(num, str) => onValueChange?.(str === NumericInput.VALUE_EMPTY ? undefined : num)}
            />
        </FormGroup>
    );
};
