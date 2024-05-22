import { useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { login } from '../api';
import { Helmet } from 'react-helmet';
import './Login.scss';

export const Login: FC = (): ReactElement => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loginFailed, setLoginFailed] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleLogin = useCallback(async () => {
        try {
            await login(userId, password);
            setLoginFailed(false);
            queryClient.invalidateQueries();
            navigate('/auth/user', { replace: true });
        } catch {
            setLoginFailed(true);
            setPassword('');
        }
    }, [userId, password, queryClient, navigate]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return(
        <div className='login'>
            <div className='login-form'>
                <Helmet><title>Login</title></Helmet>
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
            <button onClick={handleLogin}>Log In</button>
            <div>
                {loginFailed && 'Invalid UserId or password'}
            </div>
        </div>
    );
};
