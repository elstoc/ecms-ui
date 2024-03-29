import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { ComponentMetadata } from '../../types/Site';
import './SiteNav.scss';

export const SiteNav: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    const className = componentMetadata.length === 1 ? 'single-component' : '';

    return (
        <div className='sitenav'>
            {componentMetadata.map((props) =>
                <NavLink className={className} to={props.uiPath} key={props.apiPath}>{props.title}</NavLink>
            )}
        </div>
    );
};
