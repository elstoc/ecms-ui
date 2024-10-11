import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@blueprintjs/core';

import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { ContentWithSidebar } from '../../shared/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';
import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownPage.scss';

export const MarkdownPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const { markdownState: { singlePage } } = useContext(MarkdownStateContext);
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const contentElement = (
        <Suspense>
            <div className='markdown-page-content'>
                <MarkdownToolbox apiPath={apiPath} />
                <Card className='markdown-page-content'>
                    {mode === 'edit'
                        ? <MarkdownEditPage apiPath={apiPath} />
                        : <MarkdownViewPage apiPath={apiPath} />}
                    {mode === 'add' && <MarkdownAddPage apiPath={apiPath} />}
                </Card>
            </div>
        </Suspense>
    );

    const sidebarElement = (
        <Suspense>
            <MarkdownNav />
        </Suspense>
    );

    return (
        <ContentWithSidebar
            contentElement={contentElement}
            sidebarElement={singlePage ? null : sidebarElement}
            mobileSidebarAtTop={true}
        />
    );
};
