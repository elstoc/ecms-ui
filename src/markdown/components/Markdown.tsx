import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ContentWithSidebar } from '../../common/components/layout';
import { MarkdownMetadata } from '../../site/api';
import { MarkdownContent } from './MarkdownContent';
import { MarkdownNav } from './MarkdownNav';
import { useTitle } from '../../common/hooks';

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, includeNav }): ReactElement => {
    useTitle(title);
    const navContainerElement = (
        <Suspense fallback='Loading...'>
            {includeNav && <MarkdownNav rootApiPath={apiPath} />}
        </Suspense>
    );

    const pageContainerElement = (
        <Suspense fallback='Loading...'>
            <Routes>
                <Route path="*" element={<MarkdownContent apiPath={apiPath} />} />
            </Routes>
        </Suspense>
    );

    return (
        <ContentWithSidebar
            mainPageElement={pageContainerElement}
            sidebarElement={navContainerElement}
        />
    );
};
