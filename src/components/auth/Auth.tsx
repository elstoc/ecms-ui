import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import { Helmet } from 'react-helmet';

import { useUserInfo } from '../../hooks/useUserInfo';
import { Login } from './Login';
import { Welcome } from './Welcome';
import './Auth.css';

export const Auth: FC = (): ReactElement => {
    const { isLoading, isError, data: userData } = useUserInfo();

    return (
        <div className='auth-container'>
            <Helmet><title>User ({userData?.id ?? ''})</title></Helmet>
            {isError && 'There has been an ERROR'}
            {isLoading && 'Loading data'}
            <Routes>
                <Route path="user" element={<Welcome user={userData?.id ?? ''} />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
};
