import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import './SiteNav.css';

type SiteNavProps = {
    siteProps: SiteProps
};

export const SiteNav: FC<SiteNavProps> = ({ siteProps }): ReactElement => {
    return (
        <div className='site-nav'>
            {siteProps.map((props) =>
                <NavLink to={props.uiPath} key={props.apiPath}>{props.title}</NavLink>
            )}
        </div>
    );
};
