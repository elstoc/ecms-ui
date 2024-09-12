import React, { FC, ReactElement, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { logout } from '../api';
import { Button } from '@blueprintjs/core';

import './Welcome.scss';

export const Welcome: FC<{ user: string }> = ({ user }): ReactElement => {
    const queryClient = useQueryClient();

    const handleLogout = useCallback(async () => {
        await logout();
        await queryClient.invalidateQueries();
    }, [queryClient]);

    return (
        <div className='welcome-user'>
            <div>You are currently logged in as {user}</div>
            <Button onClick={handleLogout}>Log Out</Button>
        </div>
    );
};
