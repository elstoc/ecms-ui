import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { MarkdownPage } from './MarkdownPage';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

type MarkdownProps = {
    apiPath: string;
    title: string;
    includeNav: boolean;
}

export const Markdown: FC<MarkdownProps> = ({ apiPath, title, includeNav }): ReactElement => {
    return (
        <div className='markdown'>
            <Helmet><title>{title}</title></Helmet>
            <nav className='markdown-nav-container'>
                {includeNav && <MarkdownNav apiPath={apiPath} />}
            </nav>
            <div className='markdown-page-container'>
                <Routes>
                    <Route path="*" element={<MarkdownPage apiPath={apiPath} />} />
                </Routes>
            </div>
        </div>
    );
};
