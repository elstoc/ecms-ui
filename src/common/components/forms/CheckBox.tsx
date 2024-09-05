import React, { FC, ReactElement } from 'react';
import { Checkbox, FormGroup } from '@blueprintjs/core';

type CheckBoxParams = {
    label?: string;
    value: boolean;
    inline?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
}

export const CheckBox: FC<CheckBoxParams> = ({ value, onValueChange, label, inline, className }): ReactElement => {
    return (
        <FormGroup label={label} inline={inline} className={className}>
            <Checkbox
                checked={value}
                onChange={(ev) => onValueChange?.(ev.target.checked)}
            />
        </FormGroup>
    );
};
