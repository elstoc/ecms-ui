import { Card } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';

import './Toolbox.scss';

export type ToolboxProps = {
    content: ReactElement | null;
    orientation: 'horizontal' | 'vertical';
}

export const Toolbox: FC<ToolboxProps> = ({ content, orientation }): ReactElement => {
    return (
        <Card className={`toolbox ${orientation}`}>
            {content}
        </Card>
    );
};
