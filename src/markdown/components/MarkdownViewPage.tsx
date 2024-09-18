/* eslint-disable jsx-a11y/anchor-is-valid */
import YAML from 'yaml';
import React, { FC, ReactElement, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Icon } from '../../common/components/icon';
import { splitFrontMatter } from '../../utils';

import './MarkdownViewPage.scss';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { useTitle } from '../../common/hooks';

const RenderMd = React.lazy(() => import('../../common/components/rendermd/RenderMdAsDefault'));

const basename = (path: string): string => {
    return path.split('/').reverse()[0];
};

export const MarkdownViewPage: FC<{ mdFullPath: string }> = ({ mdFullPath }): ReactElement => {
    const [, setSearchParams] = useSearchParams();
    const mdPage = useMarkdownPage(mdFullPath);
    const { pathValid, pageExists } = mdPage;

    const setEditMode = () => setSearchParams({ mode: 'edit' });

    const [yaml, markdown] = splitFrontMatter(mdPage?.content ?? '');
    const pageTitle = YAML.parse(yaml)?.title || basename(mdFullPath) || 'Home';
    useTitle(pageTitle);

    if (!pageExists) {
        if (pathValid) {
            return (
                <h2 className='notExist'>
                    This page does not exist yet but you can
                    click <a href='#' onClick={setEditMode}>here</a> to create it
                </h2>
            );
        } else {
            return <h2 className='notExist'>This is not a valid markdown path</h2>;
        }
    }

    return (
        <Suspense>
            <div className='markdown-toolbox'>
                <Icon
                    name='edit'
                    disabled={!pageExists || !pathValid}
                    onClick={setEditMode}
                    tooltipContent='view/edit page source'
                    tooltipPosition='top-right'
                />
            </div>
            <div className='markdown-render-page'>
                <RenderMd pageTitle={pageTitle} markdown={markdown} />
            </div>
        </Suspense>
    );
};
