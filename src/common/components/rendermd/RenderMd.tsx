import React, { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';

import './RenderMdCode.scss';
import './RenderMd.scss';

export type RenderMdProps = {
    markdown: string;
    pageTitle: string;
};

export const RenderMd: FC<RenderMdProps> = ({ pageTitle, markdown }): ReactElement => {
    return (
        <span className='rendered-md'>
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
        </span>
    );
};
