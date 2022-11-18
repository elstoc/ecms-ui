import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import MarkdownPage from './MarkdownPage';
import './Markdown.css';

export type MarkdownProps = {
    path: string;
}

const Markdown: FC<MarkdownProps> = ({ path }): ReactElement => {
    return (
        <Routes>
            <Route path=":mdFilePath" element={<MarkdownPage path={path} />} />
            <Route path="*" element={<MarkdownPage path={path} />} />
        </Routes>
    );
};

export default Markdown;
