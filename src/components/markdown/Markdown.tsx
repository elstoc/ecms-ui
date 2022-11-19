import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import MarkdownPage from './MarkdownPage';
import './Markdown.css';

export type MarkdownProps = {
    path: string;
    title: string;
}

const Markdown: FC<MarkdownProps> = ({ path, title }): ReactElement => {
    return (
        <Routes>
            <Route path=":mdFilePath" element={<MarkdownPage path={path} title={title} />} />
            <Route path="*" element={<MarkdownPage path={path} title={title} />} />
        </Routes>
    );
};

export default Markdown;
