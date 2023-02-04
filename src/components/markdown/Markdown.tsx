import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownPage } from './MarkdownPage';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

export type MarkdownProps = {
    uiPath: string;
    apiPath: string;
    title: string;
    includeNav: boolean;
}

export const Markdown: FC<MarkdownProps> = ({ uiPath, apiPath, title, includeNav }): ReactElement => {
    if (!includeNav) {
        return <MarkdownPage uiPath={uiPath} apiPath={apiPath} title={title} />;
    }

    return (
        <div className='markdown-content'>
            <nav className='markdown-nav'>
                <MarkdownNav uiPath={uiPath} apiPath={apiPath} title={title} />
            </nav>
            <Routes>
                <Route path="*" element={<MarkdownPage uiPath={uiPath} apiPath={apiPath} title={title} />} />
            </Routes>
        </div>
    );
};
