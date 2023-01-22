import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useMarkdownNav } from '../../hooks/markdownQueries';
import { MdNavContents } from '../../types/Markdown';

export type MarkdownNavProps = {
    path: string;
    title: string;
}

export const MarkdownNav: FC<MarkdownNavProps> = ({ path, title }): ReactElement => {
    const { isLoading, isError, data: navContents } = useMarkdownNav(path);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading || !navContents) {
        return <div>Loading Navigation</div>;
    }

    return (
        <ol>
            <li><NavLink to={'/' + navContents.meta.uiPath} end >{navContents.meta.title}</NavLink></li>
            {navContents.children && <MarkdownNavRecurse children={navContents.children} />}
        </ol>
    );
};

const MarkdownNavRecurse: FC<{ children: MdNavContents[] }> = ({ children }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                return (
                    <React.Fragment key = {child.meta.uiPath } >
                        <li><NavLink to={'/' + child.meta.uiPath} end>{child.meta.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
