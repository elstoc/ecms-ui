import React, { FC, ReactElement } from 'react';

import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';
import YAML from 'yaml';

import { splitFrontMatter } from '../../utils/splitFrontMatter';

import './MarkdownPageRender.css';
import './MarkdownPageRenderCode.css';

export type MarkdownPageRenderProps = {
    path: string;
    title: string;
    markdown: string;
};

const MarkdownPageRender: FC<MarkdownPageRenderProps> = ({ path, markdown }): ReactElement => {
    const [yaml, content] = splitFrontMatter(markdown);
    const pageTitle = YAML.parse(yaml)?.title;

    return (
        <div className='markdown-page'>
            {pageTitle && <h1 className='title'>{pageTitle}</h1>}
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
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPageRender;
