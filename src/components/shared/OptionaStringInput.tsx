import React, { FC, ReactElement } from 'react';
import { ControlGroup, FormGroup, InputGroup, Switch } from '@blueprintjs/core';

type OptionalStringInputParams = {
    value?: string;
    onValueChange?: (value?: string) => void;
    defaultValue: string;
    label: string;
};

export const OptionalStringInput: FC<OptionalStringInputParams> = ({ value, onValueChange, defaultValue, label }): ReactElement => {
    const switchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.checked ? defaultValue : undefined;
        onValueChange?.(newValue);
    };

    return (
        <FormGroup>
            <ControlGroup vertical={false}>
                <Switch
                    className='switch'
                    inline={false}
                    checked={value !== undefined}
                    onChange={switchChange}
                />
                <FormGroup label={label} inline={true}>
                    <InputGroup
                        value={value === undefined ? defaultValue : value}
                        disabled={value === undefined}
                        onValueChange={onValueChange}
                    />
                </FormGroup>
            </ControlGroup>
        </FormGroup>
    );
};
