import React, { FC, ReactElement, Suspense, useState } from 'react';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { useSiteConfig } from '../../site';
import { useUserInfo } from '..';

import { Icon } from '../../shared/components/icon';
import { Login } from './Login';
import { Welcome } from './Welcome';

import './UserInfo.scss';

export const UserInfo: FC = (): ReactElement => {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const userData = useUserInfo();
    const siteConfig = useSiteConfig();

    if (!siteConfig.authEnabled) {
        return <></>;
    }

    const loggedIn = userData.id !== 'guest';
    const userName = userData.fullName || userData.id;

    return (
        <div className='user-info'>
            <Icon
                name={loggedIn ? 'user' : 'noUser'}
                tooltipContent={loggedIn ? userName : 'Log in'}
                tooltipPosition='left'
                onClick={() => setAuthDialogOpen(true)}
            />
            <Dialog
                title={loggedIn ? 'Welcome' : 'Log in'}
                isOpen={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                className='auth-dialog'
            >
                <DialogBody>
                    <Suspense>
                        {loggedIn && <Welcome user={userName} />}
                        {!loggedIn && <Login />}
                    </Suspense>
                </DialogBody>
            </Dialog>
        </div>
    );
};
