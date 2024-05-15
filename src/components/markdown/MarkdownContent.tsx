import YAML from 'yaml';
import React, { FC, ReactElement, Suspense } from 'react';
import { useParams } from 'react-router';

import { MarkdownViewPage } from './MarkdownViewPage';
import { useMarkdownPage } from '../../hooks/useApiQueries';
import { useSearchParams } from 'react-router-dom';
import { HandleQueryState } from '../utils/HandleQueryState';
import { Helmet } from 'react-helmet';
import { splitFrontMatter } from '../../utils/splitFrontMatter';

import './MarkdownContent.scss';

const MarkdownEditPage = React.lazy(() => import('./MarkdownEditPage'));

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

    const [ queryState, mdPage ] = useMarkdownPage(mdFullPath);
    const [yaml] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';

    return (
        <div className='markdown-content'>
            <Helmet><title>{pageTitle}</title></Helmet>
            <Suspense fallback='Loading'>
                <HandleQueryState {...queryState}>
                    {
                        mode === 'edit'
                            ? <MarkdownEditPage mdFullPath={mdFullPath} mdPage={mdPage} />
                            : <MarkdownViewPage mdFullPath={mdFullPath} mdPage={mdPage} pageTitle={pageTitle} />
                    }
                </HandleQueryState>
            </Suspense>
        </div>
    );
};
