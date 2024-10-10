import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    contentElement: ReactElement;
    sidebarElement: ReactElement | null;
    mobileSidebarAtTop?: boolean;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ contentElement, sidebarElement, mobileSidebarAtTop }): ReactElement => {
    return (
        <div className={`content-with-sidebar ${mobileSidebarAtTop ? 'sidebar-top' : ''}`}>
            {sidebarElement &&
                <div className='sidebar-container'>
                    {sidebarElement}
                </div>}
            <div className={'content-container'}>
                {contentElement}
            </div>
        </div>
    );
};
