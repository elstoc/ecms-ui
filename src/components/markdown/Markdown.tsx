import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownPage } from './MarkdownPage';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

export type MarkdownProps = {
    apiPath: string;
    title: string;
    includeNav: boolean;
}

export const Markdown: FC<MarkdownProps> = ({ apiPath, title, includeNav }): ReactElement => {
    if (!includeNav) {
        return <MarkdownPage apiPath={apiPath} title={title} />;
    }

    return (
        <div className='markdown-content'>
            <nav className='markdown-nav'>
                <MarkdownNav apiPath={apiPath} title={title} />
            </nav>
            <Routes>
                <Route path="*" element={<MarkdownPage apiPath={apiPath} title={title} />} />
            </Routes>
        </div>
    );
};
