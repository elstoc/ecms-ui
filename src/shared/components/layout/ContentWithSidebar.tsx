import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Collapse } from '@blueprintjs/core';

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

    let sidebarElement = (
        <div className='cws-sidebar'>
            {sidebar}
        </div>
    );

    const menuIcon = (
        <Icon
            name='menu'
            className='sidebar-button'
            onClick={() => setSidebarDrawerVisible((visible) => !visible)}
        />
    );

    if (!isDualPanel && sidebar) {
        sidebarElement = (
            <Collapse isOpen={sidebarDrawerVisible} keepChildrenMounted={true}>
                <div className='cws-sidebar' onClick={() => closeSidebarOnClick && setSidebarDrawerVisible(false)}>
                    {sidebar}
                </div>
            </Collapse>
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
                    {sidebar && sidebarElement}
                    <div className='cws-content'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};
