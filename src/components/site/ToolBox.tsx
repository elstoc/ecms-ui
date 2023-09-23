import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../utils/Icon';
import { useUserInfo } from '../../hooks/useApiQueries';

import './ToolBox.scss';

export const ToolBox: FC = (): ReactElement => {
    const [,userData ] = useUserInfo();
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
