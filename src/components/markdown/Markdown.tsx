import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { MarkdownContent } from './MarkdownContent';
import { MarkdownNav } from './MarkdownNav';
import './Markdown.css';

type MarkdownProps = {
    componentApiPath: string;
    title: string;
    includeNav: boolean;
}

export const Markdown: FC<MarkdownProps> = ({ componentApiPath, title, includeNav }): ReactElement => {
    return (
        <div className='markdown'>
            <Helmet><title>{title}</title></Helmet>
            <nav className='markdown-nav-container'>
                {includeNav && <MarkdownNav apiPath={componentApiPath} />}
            </nav>
            <div className='markdown-page-container'>
                <Routes>
                    <Route path="*" element={<MarkdownContent componentApiPath={componentApiPath} />} />
                </Routes>
            </div>
        </div>
    );
};
