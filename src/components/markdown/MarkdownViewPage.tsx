import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import YAML from 'yaml';

import { MarkdownRenderPage } from './MarkdownRenderPage';

import { splitFrontMatter } from '../../utils/splitFrontMatter';
import { Icon } from '../utils/Icon';
import { MarkdownPage } from '../../types/Markdown';

export type MarkdownViewPageProps = {
    mdFullPath: string;
    mdPage?: MarkdownPage;
};

const basename = (path: string): string => {
    return path.split('/').reverse()[0].replace(/\.md$/,'');
};

export const MarkdownViewPage: FC<MarkdownViewPageProps> = ({ mdFullPath, mdPage }): ReactElement => {
    const [, setSearchParams] = useSearchParams();

    if (!mdPage) return <></>;
    const [yaml, markdown] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';

    const setEditMode = () => setSearchParams({ mode: 'edit' });

    return (
        <>
            <Helmet><title>{pageTitle}</title></Helmet>
            <div className='markdown-toolbox'>
                <Icon name='showSource' onClick={setEditMode} tooltipContent='view/edit page source'/>
            </div>
            <MarkdownRenderPage pageTitle={pageTitle} markdown={markdown} />
        </>
    );
};
