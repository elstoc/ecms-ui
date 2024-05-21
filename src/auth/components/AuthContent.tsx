import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import { Helmet } from 'react-helmet';

import { useUserInfo } from '../hooks/useAuthQueries';
import { Login } from './Login';
import { Welcome } from './Welcome';

import './AuthContent.css';

export const AuthContent: FC = (): ReactElement => {
    const userData = useUserInfo();

    return (
        <div className='auth-container'>
            <Helmet><title>User ({userData?.id ?? ''})</title></Helmet>
            <Routes>
                <Route path="user" element={<Welcome user={userData?.id ?? ''} />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
};
