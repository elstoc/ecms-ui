/* eslint-disable jsx-a11y/anchor-is-valid */
import YAML from 'yaml';
import React, { FC, ReactElement, ReactNode, Suspense } from 'react';
import { Link } from 'react-router-dom';

import { splitFrontMatter } from '../../utils';
import { useTitle } from '../../common/hooks';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';

import './MarkdownViewPage.scss';

const RenderMd = React.lazy(() => import('../../common/components/rendermd/RenderMdAsDefault'));

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownViewPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const { content } = useMarkdownPage(apiPath);

    const [yaml, markdown] = splitFrontMatter(content);
    const pageTitle = YAML.parse(yaml)?.title || basename(apiPath) || 'Home';
    useTitle(pageTitle);

    const renderLink = (href: string, children: ReactNode & ReactNode[]) => {
        return <Link to={href.replace(/\/$/, '')} relative='path'>{children}</Link>;
    };

    return (
        <Suspense>
            <div className='markdown-render-page'>
                <RenderMd pageTitle={pageTitle} markdown={markdown} renderLink={renderLink} />
            </div>
        </Suspense>
    );
};
