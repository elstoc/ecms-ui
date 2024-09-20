import React, { FC, ReactElement, useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Tooltip } from '@blueprintjs/core';

import './PasswordInput.scss';

type PasswordInputParams = {
    value: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
    small?: boolean;
    className?: string;
    onPressEnter?: () => void;
};

export const PasswordInput: FC<PasswordInputParams> = ({ value, onValueChange, placeholder, label, inline, small, className = '', onPressEnter }): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onPressEnter?.();
        }
    };

    const lockButton = (
        <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`} position='right'>
            <Button
                icon={showPassword ? 'unlock' : 'lock'}
                intent={Intent.WARNING}
                minimal={true}
                onClick={() => setShowPassword((shown) => !shown)}
            />
        </Tooltip>
    );

    return (
        <FormGroup label={label} inline={inline}  className={`password-input ${className}`}>
            <InputGroup
                value={value}
                onValueChange={(value) => onValueChange?.(value)}
                placeholder={placeholder}
                rightElement={lockButton}
                type={showPassword ? 'text' : 'password'}
                small={small}
                onKeyDown={handleKeyDown}
            />
        </FormGroup>
    );
};
