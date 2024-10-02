import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownTree } from '../api';

import './MarkdownNav.scss';

export const MarkdownNav: FC<{ rootApiPath: string }> = ({ rootApiPath }): ReactElement => {
    const markdownTree = useMarkdownTree(rootApiPath);

    return (
        <span className='markdown-nav'>
            {markdownTree?.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={markdownTree.children} />}
        </span>
    );
};

const MarkdownNavRecurse: FC<{ children: MarkdownTree[], rootApiPath: string }> = ({ children, rootApiPath }): ReactElement => {
    const removeRootPathRx = new RegExp(`^${rootApiPath}/`, 'g');
    const removeRootPathRx2 = new RegExp(`^${rootApiPath}`, 'g');

    return (
        <ol>
            {children.map((child) => {
                const linkPath = child.apiPath.replace(removeRootPathRx, './').replace(removeRootPathRx2, '');
                return (
                    <React.Fragment key = {child.apiPath}>
                        <li><NavLink to={linkPath} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
