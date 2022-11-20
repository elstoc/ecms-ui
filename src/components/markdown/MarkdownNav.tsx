import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useMarkdownNav } from '../../hooks/markdownQueries';
import { MdNavContents } from '../../types/Markdown';

import './MarkdownNav.css';

export type MarkdownNavProps = {
    path: string;
    title: string;
}

const MarkdownNavRecurse: FC<{ children: MdNavContents[] }> = ({ children }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                return (
                    <React.Fragment key = {child.meta.uiPath } >
                        <li><NavLink to={'/' + child.meta.uiPath}>{child.meta.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};

const MarkdownNav: FC<MarkdownNavProps> = ({ path, title }): ReactElement => {
    const { isLoading, error, data: navContents } = useMarkdownNav(path);

    if (error) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading || !navContents) {
        return <div>Loading Nav</div>;
    }
    return (
        <ol>
            <li><NavLink to={'/' + navContents.meta.uiPath}>{navContents.meta.title}</NavLink></li>
            {navContents.children && <MarkdownNavRecurse children={navContents.children} />}
        </ol>
    );
};

export default MarkdownNav;
