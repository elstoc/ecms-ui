import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';
import { MarkdownToolbox } from './MarkdownToolbox';

export const MarkdownPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <MarkdownToolbox apiPath={apiPath}>
            {mode === 'edit'
                ? <MarkdownEditPage apiPath={apiPath} />
                : <MarkdownViewPage apiPath={apiPath} />}
            {mode === 'add' && <MarkdownAddPage apiPath={apiPath} />}
        </MarkdownToolbox>
    );
};
