import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import MarkdownPage from './MarkdownPage';
import MarkdownNav from './MarkdownNav';
import './Markdown.css';

export type MarkdownProps = {
    path: string;
    title: string;
}

const Markdown: FC<MarkdownProps> = ({ path, title }): ReactElement => {
    return (
        <div className='markdown-content'>
            <nav className='markdown-nav'>
                <MarkdownNav path={path} title={title} />
            </nav>
            <Routes>
                <Route path="*" element={<MarkdownPage path={path} title={title} />} />
            </Routes>
        </div>
    );
};

export default Markdown;
