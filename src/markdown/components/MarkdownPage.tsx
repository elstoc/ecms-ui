import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@blueprintjs/core';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';
import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownPage.scss';

export const MarkdownPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <div className='markdown-page-content'>
            <MarkdownToolbox apiPath={apiPath} />
            <Card className='markdown-page-content'>
                {mode === 'edit'
                    ? <MarkdownEditPage apiPath={apiPath} />
                    : <MarkdownViewPage apiPath={apiPath} />}
                {mode === 'add' && <MarkdownAddPage apiPath={apiPath} />}
            </Card>
        </div>
    );
};
