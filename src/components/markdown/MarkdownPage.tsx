import React, { FC, ReactElement } from 'react';

import { useParams } from 'react-router';

import { MarkdownPageRender } from './MarkdownPageRender';
import { useMarkdownFile } from '../../hooks/markdownQueries';

export type MarkdownPageProps = {
    path: string;
    title: string;
};

export const MarkdownPage: FC<MarkdownPageProps> = ({ path, title }): ReactElement => {
    const { '*': mdFilePath } = useParams();
    const fullPath = `${path}/${mdFilePath || ''}`;

    const {isLoading, error, data: mdFile} = useMarkdownFile(fullPath);

    if (isLoading || error || !mdFile) return <div>Nothing to see here</div>;

    return (
        <MarkdownPageRender path={fullPath} title={title} markdown={mdFile} />
    );
};
