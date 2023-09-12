import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';
import { useUserInfo } from '../../hooks/useUserInfo';

import './ToolBox.scss';

export const ToolBox: FC = (): ReactElement => {
    const { data: userData } = useUserInfo();
    const iconName = userData?.id && userData.id !== 'guest'
        ? 'user'
        : 'noUser';

    return (
        <div className='toolbox'>
            <NavLink to="auth/user">
                <Icon name={iconName} />
            </NavLink>
        </div>
    );
};
