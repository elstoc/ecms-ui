import { useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactElement, useCallback, useState } from 'react';

import { login } from '../api';
import { useTitle } from '../../common/hooks';

import './Login.scss';
import { Button } from '@blueprintjs/core';

export const Login: FC = (): ReactElement => {
    const queryClient = useQueryClient();
    const [loginFailed, setLoginFailed] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useTitle('Login');
    
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

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return(
        <div className='login'>
            <div>You are currently viewing this site as a guest</div>
            <div className='login-form'>
                <label>UserId</label>
                <input
                    id='userId'
                    type='text'
                    value={userId}
                    autoFocus={true}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <label>Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleLogin}>Log In</Button>
            <div>
                {loginFailed && 'Invalid UserId or password'}
            </div>
        </div>
    );
};
