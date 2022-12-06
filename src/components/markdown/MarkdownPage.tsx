import React, { FC, ReactElement } from 'react';

import { useParams } from 'react-router';

import MarkdownPageRender from './MarkdownPageRender';
import { useMarkdownFile } from '../../hooks/markdownQueries';

export type MarkdownPageProps = {
    path: string;
    title: string;
};

const MarkdownPage: FC<MarkdownPageProps> = ({ path, title }): ReactElement => {
    const { '*': mdFilePath } = useParams();

    const {isLoading, error, data: mdFile} = useMarkdownFile(`${path}/${mdFilePath || ''}`);

    if (isLoading || error || !mdFile) return <div>Nothing to see here</div>;

    return (
        <MarkdownPageRender path={path} title={title} markdown={mdFile} />
    );
};

export default MarkdownPage;
