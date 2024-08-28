import React, { FC, ReactElement } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

type NullableStringInputParams = {
    value: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
    small?: boolean;
    className?: string;
};

export const NullableStringInput: FC<NullableStringInputParams> = ({ value, onValueChange, placeholder, label, inline, small, className }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline} className={className}>
            <InputGroup
                value={value || ''}
                onValueChange={(value) => onValueChange?.(value === '' ? null : value)}
                placeholder={placeholder}
                small={small}
            />
        </FormGroup>
    );
};
