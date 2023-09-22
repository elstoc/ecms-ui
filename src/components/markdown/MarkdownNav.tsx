import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useMarkdownTree } from '../../hooks/useApiQueries';
import { MarkdownTree } from '../../types/Markdown';
import './MarkdownNav.scss';
import { HandleQueryState } from '../utils/HandleQueryState';

export const MarkdownNav: FC<{ rootApiPath: string }> = ({ rootApiPath }): ReactElement => {
    const [ queryState, markdownTree ] = useMarkdownTree(rootApiPath);

    return (
        <span className='markdown-nav'>
            <HandleQueryState {...queryState}>
                {markdownTree?.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={markdownTree.children} />}
            </HandleQueryState>
        </span>
    );
};

const MarkdownNavRecurse: FC<{ children: MarkdownTree[], rootApiPath: string }> = ({ children, rootApiPath }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                if (!child.apiPath) {
                    throw new Error('apiPath not specified');
                }
                const linkPath = child.apiPath.replace(`${rootApiPath}/`, './').replace(rootApiPath, '');
                return (
                    <React.Fragment key = {child.apiPath} >
                        <li><NavLink to={linkPath} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
