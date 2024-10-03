import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownTree } from '../api';

import { MarkdownContent } from './MarkdownContent';

import './MarkdownNav.scss';

export const MarkdownRoutes: FC<{ rootApiPath: string }> = ({ rootApiPath }): ReactElement => {
    const markdownTree = useMarkdownTree(rootApiPath);

    if (!markdownTree.children) return <></>;

    return (
        <Routes>
            {listMarkdownRoutes(markdownTree.children)}
        </Routes>
    );
};

const listMarkdownRoutes = (children: MarkdownTree[]): ReactElement[] => {
    const routes: ReactElement[] = [];
    children.forEach((child) => {
        routes.push((
            <Route
                key={child.apiPath}
                path={child.uiPath}
                element={<MarkdownContent apiPath={child.apiPath} />}
            />
        ));
        if (child.children) {
            routes.push(...listMarkdownRoutes(child.children));
        }
    });
    return routes;
};
