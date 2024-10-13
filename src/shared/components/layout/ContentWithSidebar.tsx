import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Drawer } from '@blueprintjs/core';

import { useIsDualPanel } from '../../hooks';

import { Icon } from '../icon';
import { Toolbar } from './Toolbar';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    content: ReactElement;
    sidebar: ReactElement | null;
    toolbar: ReactElement | null;
    closeSidebarOnClick?: boolean;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ content, sidebar, toolbar, closeSidebarOnClick }): ReactElement => {
    const isDualPanel = useIsDualPanel();
    const [sidebarDrawerVisible, setSidebarDrawerVisible] = useState(false);

    useEffect(() => {
        if (isDualPanel) {
            setSidebarDrawerVisible(false);
        }
    }, [isDualPanel]);

    let sidebarElement = (
        <div className='two-panel-sidebar'>
            {sidebar}
        </div>
    );

    let toolbarElement = <Toolbar right={toolbar} left={null} />;

    if (!isDualPanel && sidebar) {
        const navIcon = (
            <Icon
                name='menu'
                onClick={() => setSidebarDrawerVisible(true)}
            />
        );
        toolbarElement = (
            <>
                <Toolbar left={navIcon} right={toolbar} />
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
        <div className='content-with-sidebar'>
            <div className='top'>
                {sidebar && <div className='sidebar-container'>
                </div>}
                <div className='toolbar-container'>
                    {toolbarElement}
                </div>
            </div>
            <div className='bottom'>
                {sidebar &&
                    <div className='sidebar-container'>
                        {sidebarElement}
                    </div>}
                <div className='content-container'>
                    {content}
                </div>
            </div>
        </div>
    );
};
