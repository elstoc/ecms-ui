import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Classes, Popover } from '@blueprintjs/core';

import { ComponentMetadata, ComponentTypes } from '../api';

import './SiteNav.scss';

export const SiteNav: FC<{ siteComponents: ComponentMetadata[] }> = ({ siteComponents }): ReactElement => {
    if (siteComponents.length === 1) {
        return <></>;
    }

    return (
        <div className='site-nav'>
            {siteComponents.map((component) =>
                <ComponentNavItem
                    key={component.apiPath}
                    component={component}
                />
            )}
        </div>
    );
};

const ComponentNavItem: FC<{ component: ComponentMetadata }> = ({ component }) => {
    if (component?.type !== ComponentTypes.componentgroup) {
        return (
            <NavLink to={component.defaultComponent ? '' : component.apiPath}>
                <div className='nav-title'>
                    {component.title}
                </div>
            </NavLink>
        );
    }

    const subMenuElement = (
        <div className='sub-menu'>
            {component.components.map((subComponent) => (
                <ComponentNavItem key={subComponent.apiPath} component={subComponent} />
            ))}
        </div>
    );

    return (
        <Popover
            content={subMenuElement}
            placement='bottom-start'
            popoverClassName={Classes.POPOVER_DISMISS}
            interactionKind='click'
            minimal={true}
            modifiers={{ offset: { enabled: true, options: { offset: [0, 14]} }}}
        >
            <NavLink to={component.apiPath}>
                <div
                    className='nav-title'
                    onClick={(e) => e.preventDefault()} // NavLink styling without functionality
                >
                    {component.title}
                </div>
            </NavLink>
        </Popover>
    );
};
