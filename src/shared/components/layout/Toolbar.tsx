import { Card } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';

import './Toolbar.scss';

type ToolbarProps = {
    left: ReactElement | null;
    right: ReactElement | null;
}

export const Toolbar: FC<ToolbarProps> = ({ left, right }): ReactElement => {
    return (
        <div className='toolbar'>
            {left ? <Card>{left}</Card> : <div className='empty'></div>}
            {right ? <Card>{right}</Card> : <div className='empty'></div>}
        </div>
    );
};
