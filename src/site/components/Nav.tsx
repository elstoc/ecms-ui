import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Classes, Popover } from '@blueprintjs/core';

import { ComponentMetadata, ComponentTypes } from '../api';

import './Nav.scss';

export const Nav: FC<{ siteComponents: ComponentMetadata[] }> = ({ siteComponents }): ReactElement => {
    return (
        <div className='sitenav'>
            {siteComponents.map((component) =>
                <ComponentNavItem
                    key={component.apiPath}
                    component={component}
                    singleComponent={siteComponents.length === 1}
                />
            )}
        </div>
    );
};

const ComponentNavItem: FC<{ component: ComponentMetadata, singleComponent?: boolean }> = ({ component, singleComponent }) => {
    if (component?.type !== ComponentTypes.componentgroup) {
        return (
            <div className={`nav-link ${singleComponent ? 'single-component' : ''}`}>
                <NavLink to={component.defaultComponent ? '' : component.apiPath}>
                    {component.title}
                </NavLink>
            </div>
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
        <div className='nav-link'>
            <Popover
                content={subMenuElement}
                placement='bottom-start'
                popoverClassName={Classes.POPOVER_DISMISS}
                interactionKind='click'
                minimal={true}
                modifiers={{ offset: { enabled: true, options: { offset: [-21, 12]} }}}
            >
                <NavLink to={component.apiPath}>
                    <div onClick={(e) => e.preventDefault()}>
                        {component.title}
                    </div>
                </NavLink>
            </Popover>
        </div>
    );
};
