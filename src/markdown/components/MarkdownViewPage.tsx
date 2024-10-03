/* eslint-disable jsx-a11y/anchor-is-valid */
import YAML from 'yaml';
import React, { FC, ReactElement, ReactNode, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { splitFrontMatter } from '../../utils';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { useTitle } from '../../common/hooks';

import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownViewPage.scss';

const RenderMd = React.lazy(() => import('../../common/components/rendermd/RenderMdAsDefault'));

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownViewPage: FC<{ mdFullPath: string }> = ({ mdFullPath }): ReactElement => {
    const location = useLocation();
    const mdPage = useMarkdownPage(mdFullPath);

    const [yaml, markdown] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';
    useTitle(pageTitle);

    const renderLink = (href: string, children: ReactNode & ReactNode[]) => {
        let basePath = window.origin + location.pathname;
        basePath += basePath.endsWith('/') ? '' : '/';
        const url = new URL(href, basePath);
        return <Link to={url.href.replace(/\/$/, '')}>{children}</Link>;
    };

    return (
        <Suspense>
            <MarkdownToolbox mdFullPath={mdFullPath}>
                <div className='markdown-render-page'>
                    <RenderMd pageTitle={pageTitle} markdown={markdown} renderLink={renderLink} />
                </div>
            </MarkdownToolbox>
        </Suspense>
    );
};
