import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownFile } from '../../hooks/useApiQueries';
import './MarkdownContent.scss';
import { useSearchParams } from 'react-router-dom';

export const MarkdownContent: FC<{ componentApiPath: string }> = ({ componentApiPath }): ReactElement => {
    const { '*': mdRelPath } = useParams();
    const mdFullPath = `${componentApiPath}/${mdRelPath ?? ''}`;

    const {isLoading, isError, data: mdFile} = useMarkdownFile(mdFullPath);
    const [searchParams] = useSearchParams();

    const mode = searchParams.get('mode');

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading) {
        return <div>Loading Page</div>;
    }

    return (
        <div className='markdown-content'>
            {
                mode === 'edit'
                    ? <MarkdownEditPage mdFullPath={mdFullPath} mdFile={mdFile} />
                    : <MarkdownViewPage mdFullPath={mdFullPath} mdFile={mdFile} />
            }
        </div>
    );
};
