import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Drawer } from '@blueprintjs/core';

import { useIsDualPanel } from '../../hooks';

import { Icon } from '../icon';
import { Toolbox } from './Toolbox';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    content: ReactElement;
    sidebar: ReactElement | null;
    toolbarIcons: ReactElement | null;
    closeSidebarOnClick?: boolean;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ content, sidebar, toolbarIcons, closeSidebarOnClick }): ReactElement => {
    const isDualPanel = useIsDualPanel();
    const [sidebarDrawerVisible, setSidebarDrawerVisible] = useState(false);

    useEffect(() => { if (isDualPanel) setSidebarDrawerVisible(false); }, [isDualPanel]);

    let sidebarElement = sidebar;

    const menuIcon = (
        <Icon
            name='menu'
            className='sidebar-button'
            onClick={() => setSidebarDrawerVisible(true)}
        />
    );

    if (!isDualPanel && sidebar) {
        sidebarElement = (
            <Drawer
                isOpen={sidebarDrawerVisible}
                onClose={() => setSidebarDrawerVisible(false)}
                size='85%'
                position='left'
            >
                <div onClick={() => closeSidebarOnClick && setSidebarDrawerVisible(false)}>
                    {sidebar}
                </div>
            </Drawer>
        );
    }

    return (
        <div className='cws-container'>
            <div className={sidebar ? 'cws' : 'cws no-sidebar'}>
                <div className='cws-toolbar'>
                    <Toolbox content={toolbarIcons} orientation={isDualPanel ? 'vertical' : 'horizontal'} />
                    {!isDualPanel && sidebar && <Toolbox content={menuIcon} orientation='vertical' />}
                </div>
                <div className='cws-content-and-sidebar'>
                    {sidebar && <div className='cws-sidebar'>
                        {sidebarElement}
                    </div>}
                    <div className='cws-content'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};
