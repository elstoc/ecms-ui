import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { ComponentMetadata } from '../api';

import './Nav.scss';

export const Nav: FC<{ siteComponents: ComponentMetadata[] }> = ({ siteComponents }): ReactElement => {
    const className = siteComponents.length === 1 ? 'single-component' : '';

    return (
        <div className='sitenav'>
            {siteComponents.map((props) =>
                <NavLink className={className} to={props.uiPath} key={props.apiPath}>{props.title}</NavLink>
            )}
        </div>
    );
};
