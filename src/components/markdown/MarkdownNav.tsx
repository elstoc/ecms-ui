import React, { FC, ReactElement } from 'react';

import './MarkdownNav.css';

export type MarkdownNavProps = {
    path: string;
    title: string;
}

const MarkdownNav: FC<MarkdownNavProps> = ({ path, title }): ReactElement => {
    return (
        <ol>
            <li>an item</li>
            <li>an item</li>
            <li>an item</li>
        </ol>
    );
};

export default MarkdownNav;
