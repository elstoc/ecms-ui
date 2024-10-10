import { Card } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';

import './Toolbar.scss';

type ToolbarProps = {
    left: ReactElement[] | null;
    middle: ReactElement[] | null;
    right: ReactElement[] | null;
}

export const Toolbar: FC<ToolbarProps> = ({ left, middle, right }): ReactElement => {
    return (
        <div className='toolbar'>
            {left ? <Card>{left}</Card> : <div className='empty'></div>}
            {middle ? <Card>{middle}</Card> : <div className='empty'></div>}
            {right ? <Card>{right}</Card> : <div className='empty'></div>}
        </div>
    );
};
