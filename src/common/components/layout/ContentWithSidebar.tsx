import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

export const ContentWithSidebar: FC<{ mainPageElement: ReactElement, sidebarElement: ReactElement }> = ({ mainPageElement, sidebarElement }): ReactElement => {
    return (
        <div className='content-container'>
            <div className='sidebar-container'>
                {sidebarElement}
            </div>
            <div className='mainpage-container'>
                {mainPageElement}
            </div>
        </div>
    );
};
