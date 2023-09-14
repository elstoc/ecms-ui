import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const WelcomeGuest: FC = (): ReactElement => {
    return (
        <>
            <div>You are currently viewing this site as a guest</div>
            <NavLink to="/auth/login"><button>Log In</button></NavLink>
        </>
    );
};
