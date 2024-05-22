import YAML from 'yaml';
import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { splitFrontMatter } from '../../utils';
import { useTitle } from '../../common/hooks';

import './MarkdownContent.scss';

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

    useTitle(pageTitle);

    return (
        <div className='markdown-content'>
            {
                mode === 'edit'
                    ? <MarkdownEditPage mdFullPath={mdFullPath} mdPage={mdPage} />
                    : <MarkdownViewPage mdFullPath={mdFullPath} mdPage={mdPage} pageTitle={pageTitle} />
            }
        </div>
    );
};
