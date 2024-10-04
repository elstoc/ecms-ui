/* eslint-disable jsx-a11y/anchor-is-valid */
import YAML from 'yaml';
import React, { FC, ReactElement, ReactNode, Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';

import { splitFrontMatter } from '../../utils';
import { useTitle } from '../../common/hooks';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from './MarkdownContent';

import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownViewPage.scss';

const RenderMd = React.lazy(() => import('../../common/components/rendermd/RenderMdAsDefault'));

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownViewPage: FC = (): ReactElement => {
    const { apiPath } = useContext(MarkdownStateContext);
    const mdPage = useMarkdownPage(apiPath);

    const [yaml, markdown] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(apiPath) || 'Home';
    useTitle(pageTitle);

    const renderLink = (href: string, children: ReactNode & ReactNode[]) => {
        return <Link to={href.replace(/\/$/, '')} relative='path'>{children}</Link>;
    };

    return (
        <Suspense>
            <MarkdownToolbox>
                <div className='markdown-render-page'>
                    <RenderMd pageTitle={pageTitle} markdown={markdown} renderLink={renderLink} />
                </div>
            </MarkdownToolbox>
        </Suspense>
    );
};
