import React, { FC, ReactElement, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@blueprintjs/core';

import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { useIsDualPanel } from '../../shared/hooks';
import { MarkdownTree } from '../api';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownNav.scss';

export const MarkdownNav: FC = (): ReactElement => {
    const { markdownState: { rootUiPath, rootApiPath, navOpen }, markdownReducer } = useContext(MarkdownStateContext);
    const markdownTree = useMarkdownTree(rootApiPath);
    const isDualPanel = useIsDualPanel();

    const handleClose = () => markdownReducer({ key: 'navOpen', value: false });

    const navContent = (
        <span className='markdown-nav' onClick={handleClose}>
            {markdownTree?.children && <MarkdownNavRecurse rootUiPath={rootUiPath} children={markdownTree.children} />}
        </span>
    );

    if (isDualPanel) {
        return navContent;
    }

    return (
        <Drawer
            isOpen={navOpen}
            onClose={handleClose}
            size='90%'
            position='left'
        >
            {navContent}
        </Drawer>
    );
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
