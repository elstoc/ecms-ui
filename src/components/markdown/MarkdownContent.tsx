import YAML from 'yaml';
import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownPage } from '../../hooks/useApiQueries';
import './MarkdownContent.scss';
import { useSearchParams } from 'react-router-dom';
import { HandleQueryState } from '../utils/HandleQueryState';
import { Helmet } from 'react-helmet';
import { splitFrontMatter } from '../../utils/splitFrontMatter';

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownContent: FC<{ componentApiPath: string }> = ({ componentApiPath }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    const { '*': mdRelPath } = useParams();
    const mdFullPath = `${componentApiPath}/${mdRelPath ?? ''}`;

    const [ queryState, mdPage ] = useMarkdownPage(mdFullPath);
    const [yaml] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';

    return (
        <div className='markdown-content'>
            <Helmet><title>{pageTitle}</title></Helmet>
            <HandleQueryState {...queryState}>
                {
                    mode === 'edit'
                        ? <MarkdownEditPage mdFullPath={mdFullPath} mdPage={mdPage} />
                        : <MarkdownViewPage mdFullPath={mdFullPath} mdPage={mdPage} pageTitle={pageTitle} />
                }
            </HandleQueryState>
        </div>
    );
};
