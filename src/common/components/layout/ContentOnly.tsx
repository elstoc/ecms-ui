import React, { FC, ReactElement } from 'react';

import './ContentOnly.scss';

export const ContentOnly: FC<{ contentElement: ReactElement }> = ({ contentElement }): ReactElement => {
    return (
        <div className='content-only'>
            <div className='content-container'>
                {contentElement}
            </div>
        </div>
    );
};
