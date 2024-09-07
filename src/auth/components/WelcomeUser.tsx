import React, { FC, ReactElement, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { logout } from '../api';

export const WelcomeUser: FC<{ user: string }> = ({ user }): ReactElement => {
    const queryClient = useQueryClient();

    const handleLogout = useCallback(async () => {
        await logout();
        await queryClient.invalidateQueries();
    }, [queryClient]);

    return (
        <>
            <div>You are currently logged in as {user}</div>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
};
