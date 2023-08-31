import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { MarkdownPage } from './MarkdownPage';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

export type MarkdownProps = {
    apiPath: string;
    title: string;
    includeNav: boolean;
}

export const Markdown: FC<MarkdownProps> = ({ apiPath, title, includeNav }): ReactElement => {
    const navElement = includeNav
        ? <MarkdownNav apiPath={apiPath} title={title} />
        : '';

    return (
        <div className='markdown'>
            <Helmet><title>{title}</title></Helmet>
            <nav className='markdown-nav-container'>
                {navElement}
            </nav>
            <div className='markdown-page-container'>
                <Routes>
                    <Route path="*" element={<MarkdownPage apiPath={apiPath} title={title} />} />
                </Routes>
            </div>
            <div className='markdown-page-right'>

            </div>
        </div>
    );
};
