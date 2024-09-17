import React, { FC, ReactElement } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

type StringInputParams = {
    value: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
    small?: boolean;
    className?: string;
    autoFocus?: boolean;
};

export const StringInput: FC<StringInputParams> = ({ value, onValueChange, placeholder, label, inline, small, className, autoFocus }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline} className={className}>
            <InputGroup
                value={value}
                onValueChange={(value) => onValueChange?.(value)}
                placeholder={placeholder}
                small={small}
                autoFocus={autoFocus}
            />
        </FormGroup>
    );
};
