import React, { FC, ReactElement } from 'react';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';
import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownPage.css';
import './MarkdownPageCode.css';
import ReactMarkdown from 'react-markdown';

const MarkdownPage: FC = (): ReactElement => {
    const {isLoading, error, data: mdFile} = useMarkdownFile();

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
