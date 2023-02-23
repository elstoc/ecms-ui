import React, { FC, ReactElement } from 'react';

import { useParams } from 'react-router';

import { MarkdownPageRender } from './MarkdownPageRender';
import { useMarkdownFile } from '../../hooks/markdownQueries';

export type MarkdownPageProps = {
    apiPath: string;
    title: string;
};

export const MarkdownPage: FC<MarkdownPageProps> = ({ apiPath, title }): ReactElement => {
    const { '*': mdFilePath } = useParams();
    const fullPath = `${apiPath}/${mdFilePath || ''}`;

    const {isLoading, isError, data: mdFile} = useMarkdownFile(fullPath);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading) {
        return <div>Loading Page</div>;
    }

    return (
        <MarkdownPageRender apiPath={fullPath} uiPath={fullPath} title={title} markdown={mdFile} />
    );
};
