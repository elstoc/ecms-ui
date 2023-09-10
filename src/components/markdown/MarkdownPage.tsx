import React, { FC, ReactElement, useCallback } from 'react';
import { useParams } from 'react-router';

import { MarkdownPageRender } from './MarkdownPageRender';
import { MarkdownPageEdit } from './MarkdownPageEdit';
import { MarkdownPageToolbox } from './MarkdownPageToolbox';
import { useMarkdownFile } from '../../hooks/markdownQueries';
import './MarkdownPage.scss';
import { useSearchParams } from 'react-router-dom';
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

    const showSource = useCallback(() => {
        if (!mode) {
            setSearchParams({ mode: 'edit' });
        } else {
            setSearchParams();
        }
    }, [mode, setSearchParams]);

    if (isError) {
        return <div>There has been an ERROR</div>;
    } else if (isLoading) {
        return <div>Loading Page</div>;
    }

    return (
        <div className='markdown-page'>
            {mode !== 'edit' && (
                <MarkdownPageRender apiPath={fullPath} title={title} markdown={mdFile} />
            )}
            {mode === 'edit' && (
                <MarkdownPageEdit markdown={mdFile} />
            )}
            <div className='markdown-page-toolbox-container'>
                <MarkdownPageToolbox showSource={showSource} />
            </div>
        </div>
    );
};
