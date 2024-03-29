import React, { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';

import './MarkdownRenderPageCode.scss';
import './MarkdownRenderPage.scss';

export type MarkdownRenderPageProps = {
    markdown: string;
    pageTitle: string;
};

export const MarkdownRenderPage: FC<MarkdownRenderPageProps> = ({ pageTitle, markdown }): ReactElement => {
    return (
        <div className='markdown-render-page'>
            {pageTitle && <h1 className='title'>{pageTitle}</h1>}
            <ReactMarkdown
                remarkPlugins={[
                    [remarkGfm, { singleTilde: false }],
                    remarkDefinitionList,
                    [emoji, { emoticon: false }],
                    [smartypants],
                ]}
                rehypePlugins={[rehypeHighlight]}
                remarkRehypeOptions={{
                    handlers: {...defListHastHandlers},
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};
