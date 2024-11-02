import React, { FC, ReactElement } from 'react';
import { Button } from '@blueprintjs/core';

import { useLogout } from '../hooks/useAuthQueries';

import './Welcome.scss';

export const Welcome: FC<{ user: string }> = ({ user }): ReactElement => {
    const { mutate } = useLogout('logged out');

    return (
        <div className='welcome-user'>
            <div>You are currently logged in as {user}</div>
            <Button onClick={() => mutate()}>Log Out</Button>
        </div>
    );
};
