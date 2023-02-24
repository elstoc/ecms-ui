import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { ComponentMetadata } from '../types/Site';
import './SiteNav.css';

export const SiteNav: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    return (
        <div className='site-nav'>
            {componentMetadata.map((props) =>
                <NavLink to={props.uiPath} key={props.apiPath}>{props.title}</NavLink>
            )}
        </div>
    );
};
