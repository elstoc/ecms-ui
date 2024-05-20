import React, { FC, ReactElement } from 'react';
import { ControlGroup, FormGroup, InputGroup } from '@blueprintjs/core';

type OptionalStringInputParams = {
    value?: string;
    onValueChange?: (value?: string) => void;
    placeholder?: string;
    label: string;
};

export const OptionalStringInput: FC<OptionalStringInputParams> = ({ value, onValueChange, placeholder, label }): ReactElement => {
    return (
        <FormGroup>
            <ControlGroup vertical={false}>
                <FormGroup label={label} inline={true}>
                    <InputGroup
                        value={value || ''}
                        onValueChange={(value) => onValueChange?.(value === '' ? undefined : value)}
                        placeholder={placeholder}
                    />
                </FormGroup>
            </ControlGroup>
        </FormGroup>
    );
};
