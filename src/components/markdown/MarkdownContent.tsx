import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownPage } from '../../hooks/useApiQueries';
import './MarkdownContent.scss';
import { useSearchParams } from 'react-router-dom';
import { HandleQueryState } from '../utils/HandleQueryState';

export const MarkdownContent: FC<{ componentApiPath: string }> = ({ componentApiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    const mdFullPath = `${componentApiPath}/${mdRelPath ?? ''}`;

    const [ queryState, mdPage ] = useMarkdownPage(mdFullPath);

    return (
        <div className='markdown-content'>
            <HandleQueryState {...queryState}>
                {
                    mode === 'edit'
                        ? <MarkdownEditPage mdFullPath={mdFullPath} mdPage={mdPage} />
                        : <MarkdownViewPage mdFullPath={mdFullPath} mdPage={mdPage} />
                }
            </HandleQueryState>
        </div>
    );
};
