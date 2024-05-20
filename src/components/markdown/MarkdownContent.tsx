import YAML from 'yaml';
import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownPage } from '../../hooks/useApiQueries';
import './MarkdownContent.scss';
import { Helmet } from 'react-helmet';
import { splitFrontMatter } from '../../utils/splitFrontMatter';

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownContent: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    let mdFullPath = apiPath;
    if (mdRelPath) {
        mdFullPath += `/${mdRelPath}`;
    }

    const mdPage = useMarkdownPage(mdFullPath);
    const [yaml] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';

    return (
        <div className='markdown-content'>
            <Helmet><title>{pageTitle}</title></Helmet>
            {
                mode === 'edit'
                    ? <MarkdownEditPage mdFullPath={mdFullPath} mdPage={mdPage} />
                    : <MarkdownViewPage mdFullPath={mdFullPath} mdPage={mdPage} pageTitle={pageTitle} />
            }
        </div>
    );
};
