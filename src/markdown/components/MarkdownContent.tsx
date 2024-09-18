import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';

export const MarkdownContent: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    let mdFullPath = apiPath;
    if (mdRelPath) {
        mdFullPath += `/${mdRelPath}`;
    }

    return mode === 'edit'
        ? <MarkdownEditPage mdFullPath={mdFullPath} />
        : <MarkdownViewPage mdFullPath={mdFullPath} />;
};
