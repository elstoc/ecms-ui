import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownPageRender } from './MarkdownPageRender';
import { MarkdownPageEdit } from './MarkdownPageEdit';
import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownPage.scss';
import { useSearchParams } from 'react-router-dom';
export type MarkdownPageProps = {
    apiPath: string;
    title: string;
};

export const MarkdownPage: FC<MarkdownPageProps> = ({ apiPath, title }): ReactElement => {
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
        <div className='markdown-page'>
            {
                mode === 'edit'
                    ? <MarkdownPageEdit markdown={mdFile} />
                    : <MarkdownPageRender apiPath={fullPath} title={title} markdown={mdFile} />
            }
        </div>
    );
};
