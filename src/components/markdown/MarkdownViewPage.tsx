import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import YAML from 'yaml';

import { MarkdownRenderPage } from './MarkdownRenderPage';

import { splitFrontMatter } from '../../utils/splitFrontMatter';
import { Icon } from '../utils/Icon';

export type MarkdownViewPageProps = {
    mdFullPath: string;
    markdown: string;
};

const basename = (path: string): string => {
    return path.split('/').reverse()[0].replace(/\.md$/,'');
};

export const MarkdownViewPage: FC<MarkdownViewPageProps> = ({ mdFullPath, markdown }): ReactElement => {
    const [yaml] = splitFrontMatter(markdown);
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';
    const [, setSearchParams] = useSearchParams();

    const setEditMode = () => setSearchParams({ mode: 'edit' });

    return (
        <>
            <Helmet><title>{pageTitle}</title></Helmet>
            <div className='markdown-toolbox'>
                <Icon name='showSource' onClick={setEditMode} tooltipContent='view/edit page source'/>
            </div>
            <MarkdownRenderPage apiPath={mdFullPath} markdown={markdown} />
        </>
    );
};
