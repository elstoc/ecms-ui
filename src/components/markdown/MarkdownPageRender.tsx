import React, { FC, ReactElement, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import smartypants from 'remark-smartypants';
import rehypeHighlight from 'rehype-highlight';
import YAML from 'yaml';

import { splitFrontMatter } from '../../utils/splitFrontMatter';
import './MarkdownPageRenderCode.scss';
import './MarkdownPageRender.scss';
import { Icon } from '../site/Icon';
import { useSearchParams } from 'react-router-dom';

export type MarkdownPageRenderProps = {
    apiPath: string;
    title: string;
    markdown: string;
};

const basename = (path: string): string => {
    return path.split('/').reverse()[0].replace(/\.md$/,'');
};

export const MarkdownPageRender: FC<MarkdownPageRenderProps> = ({ apiPath, markdown }): ReactElement => {
    const [yaml, content] = splitFrontMatter(markdown);
    const pageTitle = YAML.parse(yaml)?.title || basename(apiPath) || 'Home';

    const [, setSearchParams] = useSearchParams();

    const showSource = useCallback(() => (
        setSearchParams({ mode: 'edit' })
    ), [setSearchParams]);

    return (
        <>
            <div className='markdown-page-toolbox'>
                <Icon name='showSource' onClick={showSource} tooltipContent='view/edit page source'/>
            </div>
            <div className='markdown-page-render'>
                <Helmet><title>{pageTitle}</title></Helmet>
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
