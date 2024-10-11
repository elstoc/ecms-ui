import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    content: ReactElement;
    sidebar: ReactElement | null;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ content, sidebar }): ReactElement => {
    return (
        <div className={'content-with-sidebar'}>
            {sidebar &&
                <div className='sidebar-container'>
                    {sidebar}
                </div>}
            <div className={'content-container'}>
                {content}
            </div>
        </div>
    );
};
