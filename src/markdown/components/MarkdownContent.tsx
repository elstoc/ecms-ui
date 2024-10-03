import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';

export const MarkdownContent: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return mode === 'edit'
        ? <MarkdownEditPage mdFullPath={apiPath} />
        : <MarkdownViewPage mdFullPath={apiPath} />;
};
