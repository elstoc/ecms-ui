import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import YAML from 'yaml';

import { MarkdownRenderPage } from './MarkdownRenderPage';
import './MarkdownViewPage.scss';

import { splitFrontMatter } from '../../utils/splitFrontMatter';
import { Icon } from '../utils/Icon';
import { MarkdownPage } from '../../types/Markdown';

export type MarkdownViewPageProps = {
    mdFullPath: string;
    mdPage?: MarkdownPage;
    pageTitle: string;
};

export const MarkdownViewPage: FC<MarkdownViewPageProps> = ({ mdPage, pageTitle }): ReactElement => {
    const [, setSearchParams] = useSearchParams();

    if (!mdPage) return <></>;
    const [, markdown] = splitFrontMatter(mdPage?.content ?? '');

    const setEditMode = () => {
        setSearchParams({ mode: 'edit' });
        return false;
    };

    return (
        <>
            <div className='markdown-toolbox'>
                <Icon name='edit' disabled={!mdPage.pathValid} onClick={setEditMode} tooltipContent='view/edit page source'/>
            </div>
            {mdPage.pageExists && <MarkdownRenderPage pageTitle={pageTitle} markdown={markdown} />}
            {!mdPage.pageExists && mdPage.pathValid && <h2 className='notExist'>This page does not exist yet but you can click <a href='#' onClick={setEditMode}>here</a> to create it</h2>}
            {!mdPage.pageExists && !mdPage.pathValid && <h2 className='notExist'>This is not a valid markdown path</h2>}
        </>
    );
};
