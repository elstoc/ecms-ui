import React, { FC, ReactElement,  useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useGetMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownNav.scss';
import { MarkdownTree } from '../../contracts/markdown.contract';

export const MarkdownNav: FC = (): ReactElement => {
    const { markdownState: { rootUiPath, rootApiPath } } = useContext(MarkdownStateContext);
    const markdownTree = useGetMarkdownTree(rootApiPath);

    const navContent = (
        <span className='markdown-nav'>
            {markdownTree?.children && <MarkdownNavRecurse rootUiPath={rootUiPath} children={markdownTree.children} />}
        </span>
    );

    return navContent;
};

const MarkdownNavRecurse: FC<{ children: MarkdownTree[], rootUiPath: string }> = ({ children, rootUiPath }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                const linkPrefix = rootUiPath ? `${rootUiPath}/` : '';
                const linkName = `/${linkPrefix}${child.uiPath}`.replace(/\/$/, '');
                return (
                    <React.Fragment key = {child.apiPath}>
                        <li><NavLink to={linkName} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootUiPath={rootUiPath} children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
