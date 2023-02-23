import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useMarkdownNav } from '../../hooks/markdownQueries';
import { MdNavContents } from '../../types/Markdown';

export type MarkdownNavProps = {
    apiPath: string;
    title: string;
}

export const MarkdownNav: FC<MarkdownNavProps> = ({ apiPath, title }): ReactElement => {
    const { isLoading, isError, data: navContents } = useMarkdownNav(apiPath);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading || !navContents) {
        return <div>Loading Navigation</div>;
    }

    return (
        <>
            {navContents.children && <MarkdownNavRecurse children={navContents.children} />}
        </>
    );
};

const MarkdownNavRecurse: FC<{ children: MdNavContents[] }> = ({ children }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                return (
                    <React.Fragment key = {child.metadata.uiPath } >
                        <li><NavLink to={'/' + child.metadata.uiPath} end>{child.metadata.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse children={child.children} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
