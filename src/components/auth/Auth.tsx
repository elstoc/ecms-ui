import { useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactElement, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useUserInfo } from '../../hooks/useUserInfo';
import { logout } from '../../utils/auth';
import { Login } from './Login';
import './Auth.css';
import { Helmet } from 'react-helmet';

const Welcome: FC<{ user: string }> = ({ user }): ReactElement => {
    const queryClient = useQueryClient();

    const handleLogout = useCallback(async () => {
        await logout();
        queryClient.invalidateQueries(['auth/get-user-info']);
    }, [queryClient]);

    if (user === 'guest') {
        return (
            <>
                <div>You are currently navigating this site as a guest</div>
                <NavLink to="/auth/login"><button>Log In</button></NavLink>
            </>
        );
    }
    return (
        <>
            <div>You are currently logged in as {user}</div>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
};

export const Auth: FC = (): ReactElement => {
    const { isLoading, isError, data: userData } = useUserInfo();

    // TODO: better handle loading state
    return (
        <div className='auth-container'>
            <Helmet><title>User ({userData?.id ?? ''})</title></Helmet>
            {isError && 'There has been an ERROR'}
            {isLoading && 'Loading user'}
            <Routes>
                <Route path="user" element={<Welcome user={userData?.id ?? 'guest'} />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
};
