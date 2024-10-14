import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Card, Drawer } from '@blueprintjs/core';

import { useIsDualPanel } from '../../hooks';

import { Icon } from '../icon';

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

    let toolbarElement = (
        <Card>
            {toolbarIcons}
        </Card>
    );

    if (!isDualPanel && sidebar) {
        toolbarElement = (
            <>
                {toolbarElement}
                <Card>
                    <Icon
                        name='menu'
                        className='sidebar-menu-button'
                        onClick={() => setSidebarDrawerVisible(true)}
                    />
                </Card>
            </>
        );

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
                    {toolbarElement}
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
