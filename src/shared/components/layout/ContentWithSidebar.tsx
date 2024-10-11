import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    content: ReactElement;
    sidebar: ReactElement | null;
    toolbar: ReactElement | null;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ content, sidebar, toolbar }): ReactElement => {
    return (
        <div className='content-with-sidebar'>
            <div className='top'>
                {sidebar && <div className='sidebar-container'>
                </div>}
                <div className='content-container'>
                    {toolbar}
                </div>
            </div>
            <div className='bottom'>
                {sidebar &&
                    <div className='sidebar-container'>
                        {sidebar}
                    </div>}
                <div className='content-container'>
                    {content}
                </div>
            </div>
        </div>
    );
};
