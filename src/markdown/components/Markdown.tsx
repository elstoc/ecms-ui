import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { MarkdownContent } from './MarkdownContent';
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
                <Suspense fallback='Loading...'>
                    {includeNav && <MarkdownNav rootApiPath={apiPath} />}
                </Suspense>
            </nav>
            <div className='markdown-page-container'>
                <Suspense fallback='Loading...'>
                    <Routes>
                        <Route path="*" element={<MarkdownContent apiPath={apiPath} />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
};
