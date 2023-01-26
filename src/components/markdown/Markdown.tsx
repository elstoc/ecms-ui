import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownPage } from './MarkdownPage';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

export type MarkdownProps = {
    uiPath: string;
    apiPath: string;
    title: string;
}

export const Markdown: FC<MarkdownProps> = ({ uiPath, apiPath, title }): ReactElement => {
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
