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

    const {isLoading, isError, data: mdFile} = useMarkdownFile(fullPath);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading || !mdFile) {
        return <div>Loading Page</div>;
    }

    return (
        <MarkdownPageRender path={fullPath} title={title} markdown={mdFile} />
    );
};
