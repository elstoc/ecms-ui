import React, { FC, ReactElement, Suspense } from 'react';

import { useTitle } from '../../common/hooks';
import { MarkdownMetadata } from '../../site/api';

import { ContentOnly, ContentWithSidebar } from '../../common/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownRoutes } from './MarkdownRoutes';

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, includeNav }): ReactElement => {
    useTitle(title);

    const contentElement = (
        <Suspense>
            <MarkdownRoutes rootApiPath={apiPath} />
        </Suspense>
    );

    if (!includeNav) {
        return <ContentOnly contentElement={contentElement} />;
    }

    const sidebarElement = (
        <Suspense>
            <MarkdownNav rootApiPath={apiPath} />
        </Suspense>
    );

    return <ContentWithSidebar contentElement={contentElement} sidebarElement={sidebarElement} />;
};
