import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import './Header.css';

type HeaderProps = {
    siteProps: SiteProps
};

export const Header: FC<HeaderProps> = ({ siteProps }): ReactElement => {
    const headerLinks = siteProps.map((props) =>
        <NavLink to={props.path} key={props.path}>{props.title}</NavLink>
    );
    return (
        <div className='header-links'>
            {headerLinks}
        </div>
    );
};
