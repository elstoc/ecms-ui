import React, { FC, ReactElement } from 'react';
import YAML from 'yaml';

import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';

import { splitFrontMatter } from '../../utils/splitFrontMatter';
import './MarkdownRenderPageCode.scss';
import './MarkdownRenderPage.scss';

export type MarkdownRenderPageProps = {
    apiPath: string;
    markdown: string;
};

const basename = (path: string): string => {
    return path.split('/').reverse()[0].replace(/\.md$/,'');
};

export const MarkdownRenderPage: FC<MarkdownRenderPageProps> = ({ apiPath, markdown }): ReactElement => {
    const [yaml, content] = splitFrontMatter(markdown);
    const pageTitle = YAML.parse(yaml)?.title || basename(apiPath) || 'Home';

    return (
        <>
            <div className='markdown-render-page'>
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
        </>
    );
};
