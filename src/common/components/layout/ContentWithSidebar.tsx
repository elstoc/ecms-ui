import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    mainPageElement: ReactElement;
    sidebarElement: ReactElement;
    mobileSidebarAtTop?: boolean;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ mainPageElement, sidebarElement, mobileSidebarAtTop }): ReactElement => {
    return (
        <div className={`content-container ${mobileSidebarAtTop ? 'sidebar-top' : ''}`}>
            <div className='sidebar-container'>
                {sidebarElement}
            </div>
            <div className='mainpage-container'>
                {mainPageElement}
            </div>
        </div>
    );
};
