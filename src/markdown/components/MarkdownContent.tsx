import React, { FC, ReactElement, Suspense, useContext } from 'react';

import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { ContentOnly, ContentWithSidebar } from '../../shared/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownRoutes } from './MarkdownRoutes';

export const MarkdownContent: FC = (): ReactElement => {
    const { markdownState: { singlePage } } = useContext(MarkdownStateContext);

    const contentElement = (
        <Suspense>
            <MarkdownRoutes />
        </Suspense>
    );

    if (singlePage) {
        return <ContentOnly contentElement={contentElement} />;
    }

    const sidebarElement = (
        <Suspense>
            <MarkdownNav />
        </Suspense>
    );

    return <ContentWithSidebar contentElement={contentElement} sidebarElement={sidebarElement} mobileSidebarAtTop={true} />;
};
