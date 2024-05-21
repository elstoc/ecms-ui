import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../shared/icon';
import { useSiteConfig } from '../../hooks/useApiQueries';
import { useUserInfo } from '../../auth/hooks/useAuthQueries';

import './ToolBox.scss';

export const ToolBox: FC = (): ReactElement => {
    const userData = useUserInfo();
    const siteConfig = useSiteConfig();

    const iconName = userData?.id && userData.id !== 'guest'
        ? 'user'
        : 'noUser';

    return (
        <div className='toolbox'>
            {
                siteConfig.authEnabled &&
                <NavLink to="auth/user">
                    <Icon name={iconName} />
                </NavLink>
            }
        </div>
    );
};
