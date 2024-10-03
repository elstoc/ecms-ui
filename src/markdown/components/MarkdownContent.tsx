import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';

export const MarkdownContent: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <>
            {mode === 'edit'
                ? <MarkdownEditPage mdFullPath={apiPath} />
                : <MarkdownViewPage mdFullPath={apiPath} />}
            {mode === 'add' && <MarkdownAddPage mdFullPath={apiPath} />}
        </>
    );
};
