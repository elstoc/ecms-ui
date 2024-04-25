import React, { FC, ReactElement } from 'react';
import { ControlGroup, FormGroup, NumericInput, Switch } from '@blueprintjs/core';

type OptionalIntInputParams = {
    value?: number;
    onValueChange?: (value?: number) => void;
    defaultValue: number;
    label: string;
};

export const OptionalIntInput: FC<OptionalIntInputParams> = ({ value, onValueChange, defaultValue, label }): ReactElement => {
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
                    <NumericInput
                        value={value === undefined ? defaultValue : value}
                        buttonPosition='none'
                        disabled={value === undefined}
                        onValueChange={onValueChange}
                    />
                </FormGroup>
            </ControlGroup>
        </FormGroup>
    );
};
