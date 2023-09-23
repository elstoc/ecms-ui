import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import { Helmet } from 'react-helmet';

import { useUserInfo } from '../../hooks/useApiQueries';
import { Login } from './Login';
import { Welcome } from './Welcome';
import './Auth.css';
import { HandleQueryState } from '../utils/HandleQueryState';

export const Auth: FC = (): ReactElement => {
    const [ queryState, userData ] = useUserInfo();

    return (
        <div className='auth-container'>
            <Helmet><title>User ({userData?.id ?? ''})</title></Helmet>
            <HandleQueryState {...queryState}>
                <Routes>
                    <Route path="user" element={<Welcome user={userData?.id ?? ''} />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </HandleQueryState>
        </div>
    );
};
