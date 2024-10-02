/* eslint-disable jsx-a11y/anchor-is-valid */
import YAML from 'yaml';
import React, { FC, ReactElement, ReactNode, Suspense } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

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
    const [, setSearchParams] = useSearchParams();
    const mdPage = useMarkdownPage(mdFullPath);
    const { pathValid, pageExists } = mdPage;

    const setEditMode = () => setSearchParams({ mode: 'edit' });

    const [yaml, markdown] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';
    useTitle(pageTitle);

    const renderLink = (href: string, children: ReactNode & ReactNode[]) => {
        let basePath = window.origin + location.pathname;
        basePath += basePath.endsWith('/') ? '' : '/';
        const url = new URL(href, basePath);
        return <Link to={url.pathname.replace(/\/$/, '')}>{children}</Link>;
    };

    if (!pageExists) {
        if (pathValid) return (
            <h2 className='notExist'>
                This page does not exist yet but you can click <a href='#' onClick={setEditMode}>here</a> to create it
            </h2>
        );
        return <h2 className='notExist'>This is not a valid markdown path</h2>;
    }

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
