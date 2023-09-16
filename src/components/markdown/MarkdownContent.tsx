import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownPageEdit } from './MarkdownEditPage';
import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownContent.scss';
import { useSearchParams } from 'react-router-dom';

export const MarkdownPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const { '*': mdFilePath } = useParams();
    const fullPath = `${apiPath}/${mdFilePath ?? ''}`;

    const {isLoading, isError, data: mdFile} = useMarkdownFile(fullPath);
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
                    ? <MarkdownPageEdit markdown={mdFile} apiPath={fullPath} />
                    : <MarkdownViewPage apiPath={fullPath} markdown={mdFile} />
            }
        </div>
    );
};
