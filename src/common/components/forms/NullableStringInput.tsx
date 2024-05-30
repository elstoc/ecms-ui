import React, { FC, ReactElement } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

type NullableStringInputParams = {
    value: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
};

export const NullableStringInput: FC<NullableStringInputParams> = ({ value, onValueChange, placeholder, label, inline }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline}>
            <InputGroup
                value={value || ''}
                onValueChange={(value) => onValueChange?.(value === '' ? null : value)}
                placeholder={placeholder}
            />
        </FormGroup>
    );
};
