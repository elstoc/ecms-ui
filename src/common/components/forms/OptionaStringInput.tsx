import React, { FC, ReactElement } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

type OptionalStringInputParams = {
    value?: string;
    onValueChange?: (value?: string) => void;
    placeholder?: string;
    label: string;
};

export const OptionalStringInput: FC<OptionalStringInputParams> = ({ value, onValueChange, placeholder, label }): ReactElement => {
    return (
        <FormGroup label={label} inline={true}>
            <InputGroup
                value={value || ''}
                onValueChange={(value) => onValueChange?.(value === '' ? undefined : value)}
                placeholder={placeholder}
            />
        </FormGroup>
    );
};
