import React, { FC, ReactElement, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from '@blueprintjs/core';

import { useMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownTree } from '../api';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownNav.scss';
import variables from '../../site/variables.module.scss';

const { minDualPanelWidth } = variables;

export const MarkdownNav: FC = (): ReactElement => {
    const { markdownState: { rootApiPath, navOpen }, markdownReducer } = useContext(MarkdownStateContext);
    const markdownTree = useMarkdownTree(rootApiPath);
    const isDualPanel = useMediaQuery({ query: `screen and (min-width: ${minDualPanelWidth})` });

    const handleClose = () => markdownReducer({ key: 'navOpen', value: false });

    const navContent = (
        <span className='markdown-nav'>
            {markdownTree?.children && <MarkdownNavRecurse handleClick={handleClose} rootApiPath={rootApiPath} children={markdownTree.children} />}
        </span>
    );

    if (isDualPanel) {
        return navContent;
    }

    return (
        <Drawer
            isOpen={navOpen}
            onClose={handleClose}
            size='80%'
            position='left'
        >
            {navContent}
        </Drawer>
    );
};

const MarkdownNavRecurse: FC<{ children: MarkdownTree[], rootApiPath: string, handleClick: () => void }> = ({ children, rootApiPath, handleClick }): ReactElement => {
    return (
        <ol>
            {children.map((child) => {
                return (
                    <React.Fragment key = {child.apiPath}>
                        <li><NavLink to={child.uiPath} onClick={handleClick} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootApiPath={rootApiPath} children={child.children} handleClick={handleClick} />}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};
