import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

import './ToolBox.scss';

export const ToolBox: FC = (): ReactElement => {
    return (
        <div className='toolbox'>
            <NavLink to="auth/user">
                <Icon name='user' />
            </NavLink>
        </div>
    );
};
