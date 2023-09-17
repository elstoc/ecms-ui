import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useMarkdownNav } from '../../hooks/markdownQueries';
import { MdNavContents } from '../../types/Markdown';
import './MarkdownNav.scss';

export const MarkdownNav: FC<{ rootApiPath: string }> = ({ rootApiPath }): ReactElement => {
    const { isLoading, isError, data: navContents } = useMarkdownNav(rootApiPath);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading || !navContents) {
        return <div>Loading Navigation</div>;
    }

    return (
        <span className='markdown-nav'>
            {navContents.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={navContents.children} />}
        </span>
    );
};

const MarkdownNavRecurse: FC<{ children: MdNavContents[], rootApiPath: string }> = ({ children, rootApiPath }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                if (!child.apiPath) {
                    throw new Error('apiPath not specified');
                }
                const linkPath = child.apiPath.replace(`${rootApiPath}/`, './').replace(rootApiPath, '');
                return (
                    <React.Fragment key = {child.apiPath } >
                        <li><NavLink to={linkPath} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
