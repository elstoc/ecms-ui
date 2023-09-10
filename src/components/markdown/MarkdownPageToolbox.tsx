import React, { FC, ReactElement } from 'react';

import { Icon } from '../site/Icon';

export const MarkdownPageToolbox: FC<{ showSource: () => void}> = ({ showSource }): ReactElement => {
    return (
        <div className='markdown-page-toolbox'>
            <div onClick={showSource}><Icon name='showSource' /></div>
        </div>
    );
};
