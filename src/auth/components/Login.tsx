import { useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactElement, useCallback, useState } from 'react';

import { login } from '../api';

import './Login.scss';
import { Button, Card } from '@blueprintjs/core';
import { PasswordInput, StringInput } from '../../common/components/forms';

export const Login: FC = (): ReactElement => {
    const queryClient = useQueryClient();
    const [loginFailed, setLoginFailed] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = useCallback(async () => {
        try {
            await login(userId, password);
            setLoginFailed(false);
            await queryClient.invalidateQueries();
        } catch {
            setLoginFailed(true);
            setPassword('');
        }
    }, [userId, password, queryClient]);

    return(
        <div className='login'>
            <Card className='login-form'>
                <StringInput
                    label='User ID'
                    value={userId}
                    onValueChange={setUserId}
                    autoFocus={true}
                    inline={true}
                />
                <PasswordInput
                    label='Password'
                    value={password}
                    onValueChange={setPassword}
                    onPressEnter={handleLogin}
                    inline={true}
                />
                <Button onClick={handleLogin}>Log In</Button>
            </Card>
            <div className='error'>
                {loginFailed && 'Invalid UserId or password'}
            </div>
        </div>
    );
};
