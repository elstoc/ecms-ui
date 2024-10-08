import React, { FC, ReactElement, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownTree } from '../api';
import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { MarkdownPage } from './MarkdownPage';

export const MarkdownRoutes: FC = (): ReactElement => {
    const { markdownState: { rootApiPath, singlePage } } = useContext(MarkdownStateContext);
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
                element={<MarkdownPage apiPath={child.apiPath} />}
            />
        ));
        if (!singlePage && child.children) {
            routes.push(...listMarkdownRoutes(child.children, false));
        }
    });

    return routes;
};
