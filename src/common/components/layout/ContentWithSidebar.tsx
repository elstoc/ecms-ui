import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    mainPageElement: ReactElement;
    sidebarElement: ReactElement | null;
    mobileSidebarAtTop?: boolean;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ mainPageElement, sidebarElement, mobileSidebarAtTop }): ReactElement => {
    return (
        <div className={`content-with-sidebar ${mobileSidebarAtTop ? 'sidebar-top' : ''}`}>
            {sidebarElement &&
                <div className='sidebar-container'>
                    {sidebarElement}
                </div>
            }
            <div className={`content-container ${sidebarElement ? '' : 'no-sidebar'}`}>
                {mainPageElement}
            </div>
        </div>
    );
};
