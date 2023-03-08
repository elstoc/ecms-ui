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
    if (!includeNav) {
        return (
            <>
                <Helmet><title>{title}</title></Helmet>
                <MarkdownPage apiPath={apiPath} title={title} />
            </>
        );
    }

    return (
        <div className='markdown-content'>
            <Helmet><title>{title}</title></Helmet>
            <nav className='markdown-nav'>
                <MarkdownNav apiPath={apiPath} title={title} />
            </nav>
            <Routes>
                <Route path="*" element={<MarkdownPage apiPath={apiPath} title={title} />} />
            </Routes>
        </div>
    );
};
