import React, { FC, ReactElement, useCallback } from 'react';
import { useParams } from 'react-router';

import { MarkdownPageRender } from './MarkdownPageRender';
import { MarkdownPageEdit } from './MarkdownPageEdit';
import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../site/Icon';
export type MarkdownPageProps = {
    apiPath: string;
    title: string;
};

export const MarkdownPage: FC<MarkdownPageProps> = ({ apiPath, title }): ReactElement => {
    const { '*': mdFilePath } = useParams();
    const fullPath = `${apiPath}/${mdFilePath ?? ''}`;

    const {isLoading, isError, data: mdFile} = useMarkdownFile(fullPath);
    const [searchParams, setSearchParams] = useSearchParams();

    const mode = searchParams.get('mode');

    const showHideSource = useCallback(() => (
        mode ? setSearchParams() : setSearchParams({ mode: 'edit' })
    ), [mode, setSearchParams]);

    const saveMd = useCallback(() => (
        alert('not really saved but you get the idea')
    ), []);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading) {
        return <div>Loading Page</div>;
    }

    if (mode === 'edit') {
        return (
            <div className='markdown-page'>
                <MarkdownPageEdit markdown={mdFile} />
                <div className='markdown-page-toolbox'>
                    <Icon name='cancel' onClick={showHideSource} tooltipContent='cancel edit'/>
                    <Icon name='save' onClick={saveMd} tooltipContent='save edited page'/>
                </div>
            </div>
        );
    }
    return (
        <div className='markdown-page'>
            <MarkdownPageRender apiPath={fullPath} title={title} markdown={mdFile} />
            <div className='markdown-page-toolbox'>
                <Icon name='showSource' onClick={showHideSource} tooltipContent='view/edit page source'/>
            </div>
        </div>
    );
};
