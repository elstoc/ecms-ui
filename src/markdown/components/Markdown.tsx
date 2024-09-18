import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useTitle } from '../../common/hooks';
import { MarkdownMetadata } from '../../site/api';

import { ContentOnly, ContentWithSidebar } from '../../common/components/layout';
import { MarkdownContent } from './MarkdownContent';
import { MarkdownNav } from './MarkdownNav';

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, includeNav }): ReactElement => {
    useTitle(title);

    const contentElement = (
        <Suspense>
            <Routes>
                <Route path="*" element={<MarkdownContent apiPath={apiPath} />} />
            </Routes>
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
