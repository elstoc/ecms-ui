import React, { FC, ReactElement } from 'react';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
    content: ReactElement;
    sidebar: ReactElement | null;
    toolbar: ReactElement | null;
}

export const ContentWithSidebar: FC<ContentWithSideBarProps> = ({ content, sidebar, toolbar }): ReactElement => {
    return (
        <div className={'content-with-sidebar'}>
            {sidebar &&
                <div className='sidebar-container'>
                    {sidebar}
                </div>}
            <div className={'content-container'}>
                {toolbar}
                {content}
            </div>
        </div>
    );
};
