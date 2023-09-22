import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownFile } from '../../hooks/useApiQueries';
import './MarkdownContent.scss';
import { useSearchParams } from 'react-router-dom';
import { HandleQueryState } from '../utils/HandleQueryState';

export const MarkdownContent: FC<{ componentApiPath: string }> = ({ componentApiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    const mdFullPath = `${componentApiPath}/${mdRelPath ?? ''}`;

    const [ queryState, mdFile ] = useMarkdownFile(mdFullPath);

    return (
        <div className='markdown-content'>
            <HandleQueryState {...queryState}>
                {
                    mode === 'edit'
                        ? <MarkdownEditPage mdFullPath={mdFullPath} mdFile={mdFile!} />
                        : <MarkdownViewPage mdFullPath={mdFullPath} mdFile={mdFile!} />
                }
            </HandleQueryState>
        </div>
    );
};
