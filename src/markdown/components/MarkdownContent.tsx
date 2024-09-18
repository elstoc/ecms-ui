import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';

import './MarkdownContent.scss';

export const MarkdownContent: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    let mdFullPath = apiPath;
    if (mdRelPath) {
        mdFullPath += `/${mdRelPath}`;
    }

    return (
        <div className='markdown-content'>
            {mode === 'edit'
                ? <MarkdownEditPage mdFullPath={mdFullPath} />
                : <MarkdownViewPage mdFullPath={mdFullPath} />}
        </div>
    );
};
