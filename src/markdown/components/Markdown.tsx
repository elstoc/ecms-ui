import React, { FC, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ContentWithSidebar } from '../../common/components/layout';
import { MarkdownMetadata } from '../../site/api';
import { MarkdownContent } from './MarkdownContent';
import { MarkdownNav } from './MarkdownNav';
import { useTitle } from '../../common/hooks';

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, includeNav }): ReactElement => {
    useTitle(title);
    const pageContainerElement = (
        <Suspense>
            <Routes>
                <Route path="*" element={<MarkdownContent apiPath={apiPath} />} />
            </Routes>
        </Suspense>
    );

    const navContainerElement = (
        <Suspense>
            <MarkdownNav rootApiPath={apiPath} />
        </Suspense>
    );

    return (
        <ContentWithSidebar
            mainPageElement={pageContainerElement}
            sidebarElement={includeNav ? navContainerElement : null}
        />
    );
};
