import { useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { login } from '../../utils/auth';
import { Helmet } from 'react-helmet';

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
            setUserId('');
            queryClient.invalidateQueries();
            navigate('/auth/user', { replace: true });
        } catch {
            setLoginFailed(true);
        }
        setPassword('');
    }, [userId, password, queryClient, navigate]);

    return(
        <>
            <Helmet><title>Login</title></Helmet>
            <div>
                UserId: <input
                    id='userId'
                    type='text'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div>
                Password: <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Log In</button>
            <div>
                {loginFailed && 'Invalid UserId or password'}
            </div>
        </>
    );
};
