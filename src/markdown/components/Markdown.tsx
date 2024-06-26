import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownComponentMetadata } from '../../site/api';
import { MarkdownContent } from './MarkdownContent';
import { MarkdownNav } from './MarkdownNav';
import { useTitle } from '../../common/hooks';

import './Markdown.css';

export const Markdown: FC<MarkdownComponentMetadata> = ({ apiPath, title, includeNav }): ReactElement => {
    useTitle(title);
    return (
        <div className='markdown'>
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
