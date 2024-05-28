import React, { FC, ReactElement } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

type StringInputParams = {
    value: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
};

export const StringInput: FC<StringInputParams> = ({ value, onValueChange, placeholder, label, inline }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline}>
            <InputGroup
                value={value}
                onValueChange={(value) => onValueChange?.(value)}
                placeholder={placeholder}
            />
        </FormGroup>
    );
};
