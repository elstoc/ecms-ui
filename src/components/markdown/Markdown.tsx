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
            <div className='markdown-content'>
                <Routes>
                    <Route path=":mdFilePath" element={<MarkdownPage path={path} title={title} />} />
                    <Route path="*" element={<MarkdownPage path={path} title={title} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Markdown;
