import React, { FC, ReactElement } from 'react';

import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';

import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownPage.css';
import './MarkdownPageCode.css';

export type MarkdownPageProps = {
    path: string;
};

const MarkdownPage: FC<MarkdownPageProps> = ({ path }): ReactElement => {
    const { mdFilePath } = useParams();
    const {isLoading, error, data: mdFile} = useMarkdownFile(`${path}/${mdFilePath}`);

    if (isLoading || error || !mdFile) return <div>Nothing to see here</div>;

    return (
        <div className='markdown-content'>
            <ReactMarkdown
                remarkPlugins={[
                    [remarkGfm, { singleTilde: false }],
                    remarkDefinitionList,
                    [emoji, { emoticon: true }],
                    [smartypants],
                ]}
                rehypePlugins={[rehypeHighlight]}
                remarkRehypeOptions={{
                    handlers: {...defListHastHandlers},
                }}
            >
                {mdFile}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPage;