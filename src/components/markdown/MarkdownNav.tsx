import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useMarkdownNav } from '../../hooks/useApiQueries';
import { MdNavContents } from '../../types/Markdown';
import './MarkdownNav.scss';
import { HandleQueryState } from '../utils/HandleQueryState';

export const MarkdownNav: FC<{ rootApiPath: string }> = ({ rootApiPath }): ReactElement => {
    const [ queryState, navContents ] = useMarkdownNav(rootApiPath);

    return (
        <span className='markdown-nav'>
            <HandleQueryState {...queryState}>
                {navContents?.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={navContents.children} />}
            </HandleQueryState>
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
                    <React.Fragment key = {child.apiPath} >
                        <li><NavLink to={linkPath} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
