import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { ComponentMetadata } from '../types/Site';
import './SiteNav.scss';

export const SiteNav: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    return (
        <div className='nav-container'>
            <div className='site-nav'>
                {componentMetadata.map((props) =>
                    <NavLink to={props.uiPath} key={props.apiPath}>{props.title}</NavLink>
                )}
            </div>
            <NavLink to="auth/user">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z" />
                </svg>
            </NavLink>
        </div>
    );
};
