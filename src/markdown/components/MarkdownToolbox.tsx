/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, ReactNode, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { deleteMarkdownPage, putMarkdownPage } from '../api';
import { MarkdownStateContext } from './MarkdownContent';

import { Icon } from '../../common/components/icon';
import { AppToaster } from '../../common/components/toaster';

import './MarkdownToolbox.scss';

type MarkdownToolboxProps = {
    children: ReactNode;
    editedMarkdown?: string;
}

export const MarkdownToolbox: FC<MarkdownToolboxProps> = ({ children, editedMarkdown }): ReactElement => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { apiPath, singlePage } = useContext(MarkdownStateContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');

    const mdPage = useMarkdownPage(apiPath);
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
        await queryClient.invalidateQueries({ queryKey: ['markdownFile', apiPath]});
        await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
        setSearchParams();
    }, [apiPath, queryClient, setSearchParams]);

    const savePage = useCallback(async () => {
        try {
            await putMarkdownPage(apiPath, editedMarkdown ?? '');
            await invalidateAndToast('page saved');
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, invalidateAndToast, apiPath]);

    const deletePage = useCallback(async () => {
        try {
            if (confirm('Are you sure you want to delete this page')) {
                await deleteMarkdownPage(apiPath);
                await invalidateAndToast('page deleted');
                navigate('..', { relative: 'path' });
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [invalidateAndToast, apiPath, navigate]);

    return (
        <div className='markdown-content'>
            <div className='markdown-toolbox'>
                <Icon
                    name='add'
                    disabled={singlePage || !mdPage.canWrite || mode === 'edit'}
                    onClick={() => setSearchParams({ mode: 'add' })}
                    tooltipContent='add new child page'
                    tooltipPosition='top-right'
                />
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
