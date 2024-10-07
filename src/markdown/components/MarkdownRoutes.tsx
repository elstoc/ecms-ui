import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownTree } from '../api';

import { MarkdownPage } from './MarkdownPage';

export const MarkdownRoutes: FC<{ rootApiPath: string, singlePage: boolean }> = ({ rootApiPath, singlePage }): ReactElement => {
    const markdownTree = useMarkdownTree(rootApiPath);

    if (!markdownTree.children) return <></>;

    return (
        <Routes>
            {listMarkdownRoutes(markdownTree.children, singlePage)}
        </Routes>
    );
};

const listMarkdownRoutes = (children: MarkdownTree[], singlePage: boolean): ReactElement[] => {
    const routes: ReactElement[] = [];
    children.forEach((child) => {
        routes.push((
            <Route
                key={child.apiPath}
                path={child.uiPath}
                element={<MarkdownPage apiPath={child.apiPath} singlePage={singlePage} />}
            />
        ));
        if (!singlePage && child.children) {
            routes.push(...listMarkdownRoutes(child.children, false));
        }
    });
    return routes;
};
