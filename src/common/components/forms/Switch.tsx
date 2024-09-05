import React, { FC, ReactElement } from 'react';
import { FormGroup, Switch as BlueprintSwitch } from '@blueprintjs/core';

type SwitchParams = {
    label?: string;
    value: boolean;
    inline?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
}

export const Switch: FC<SwitchParams> = ({ value, onValueChange, label, inline, className }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline} className={className}>
            <BlueprintSwitch
                checked={value}
                onChange={(ev) => onValueChange?.(ev.target.checked)}
            />
        </FormGroup>
    );
};
