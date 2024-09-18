/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, ReactNode, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { Icon } from '../../common/components/icon';
import { deleteMarkdownPage, putMarkdownPage } from '../api';
import { AppToaster } from '../../common/components/toaster';
import { useQueryClient } from '@tanstack/react-query';

import './MarkdownToolbox.scss';

type MarkdownToolboxProps = {
    children: ReactNode;
    mdFullPath: string;
    editedMarkdown?: string;
}

export const MarkdownToolbox: FC<MarkdownToolboxProps> = ({ children, mdFullPath, editedMarkdown }): ReactElement => {
    const queryClient = useQueryClient();

    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');

    const mdPage = useMarkdownPage(mdFullPath);
    const { pathValid, pageExists } = mdPage;

    const toggleEditMode = useCallback(() => {
        if (mode === 'edit') {
            if (editedMarkdown === mdPage?.content
                || confirm('You have unsaved changes. Are you sure you wish to leave?')
            ) {
                setSearchParams();
            }
        } else {
            setSearchParams({ mode: 'edit' });
        }
    }, [editedMarkdown, mdPage?.content, mode, setSearchParams]);

    const invalidateAndToast = useCallback(async (message: string) => {
        (await AppToaster).show({ message, timeout: 2000 });
        await queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
        await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
        setSearchParams();
    }, [mdFullPath, queryClient, setSearchParams]);

    const savePage = useCallback(async () => {
        try {
            await putMarkdownPage(mdFullPath, editedMarkdown ?? '');
            await invalidateAndToast('page saved');
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, invalidateAndToast, mdFullPath]);

    const deletePage = useCallback(async () => {
        try {
            if (confirm('Are you sure you want to delete this page')) {
                await deleteMarkdownPage(mdFullPath);
                await invalidateAndToast('page deleted');
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [invalidateAndToast, mdFullPath]);

    return (
        <div className='markdown-content'>
            <div className='markdown-toolbox'>
                <Icon
                    name='delete'
                    disabled={!mdPage?.canDelete}
                    onClick={deletePage}
                    tooltipContent='delete page'
                    tooltipPosition='top-right'
                />
                <Icon
                    name='save'
                    onClick={savePage}
                    disabled={mode !== 'edit' || !mdPage?.canWrite || mdPage.content === editedMarkdown}
                    tooltipContent='save edited page'
                    tooltipPosition='top-right'
                />
                <Icon
                    name={ mode === 'edit' ? 'cancel' : 'edit' }
                    disabled={!pageExists || !pathValid}
                    onClick={toggleEditMode}
                    tooltipContent={ mode === 'edit' ? 'cancel edit' : 'view/edit page source'}
                    tooltipPosition='top-right'
                />
            </div>
            {children}
        </div>
    );
};
