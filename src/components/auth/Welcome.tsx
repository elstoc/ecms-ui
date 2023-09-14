import React, { FC, ReactElement } from 'react';

import { WelcomeGuest } from './WelcomeGuest';
import { WelcomeUser } from './WelcomeUser';

export const Welcome: FC<{ user: string }> = ({ user }): ReactElement => {
    if (!user) {
        return <></>;
    }

    return user === 'guest'
        ? <WelcomeGuest />
        : <WelcomeUser user={user} />;
};
