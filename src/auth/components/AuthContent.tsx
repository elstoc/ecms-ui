import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import { useUserInfo } from '../hooks/useAuthQueries';
import { Login } from './Login';
import { Welcome } from './Welcome';
import { useTitle } from '../../common/hooks';

import './AuthContent.css';

export const AuthContent: FC = (): ReactElement => {
    const userData = useUserInfo();
    useTitle(userData?.id ?? '');

    return (
        <div className='auth-container'>
            <Routes>
                <Route path="user" element={<Welcome user={userData?.id ?? ''} />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
};
