/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, Suspense, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { deleteMarkdownPage, putMarkdownPage } from '../api';

import { Icon } from '../../common/components/icon';
import { AppToaster } from '../../common/components/toaster';

import './MarkdownEditPage.scss';

const EditMd = React.lazy(() => import('../../common/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage: FC<{ mdFullPath: string}> = ({ mdFullPath }): ReactElement => {
    const queryClient = useQueryClient();
    const mdPage = useMarkdownPage(mdFullPath);
    const [editedMarkdown, setEditedMarkdown] = useState(mdPage.content ?? '');
    const [, setSearchParams] = useSearchParams();

    const cancelEdit = useCallback(() => {
        if (editedMarkdown === mdPage?.content || confirm('You have unsaved changes. Are you sure you wish to leave?')) {
            setSearchParams();
        }
    }, [editedMarkdown, mdPage, setSearchParams]);

    const saveMd = useCallback(async () => {
        try {
            await putMarkdownPage(mdFullPath, editedMarkdown);
            (await AppToaster).show({ message: 'page saved', timeout: 2000 });
            await queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
            await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
            setSearchParams();
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, mdFullPath, queryClient, setSearchParams]);

    const deleteMd = useCallback(async () => {
        try {
            if (confirm('Are you sure you want to delete this page')) {
                await deleteMarkdownPage(mdFullPath);
                (await AppToaster).show({ message: 'page deleted', timeout: 2000 });
                await queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
                await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
                setSearchParams();
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [mdFullPath, queryClient, setSearchParams]);

    return (
        <Suspense>
            <div className='markdown-toolbox'>
                <Icon name='delete' disabled={!mdPage?.canDelete} onClick={deleteMd} tooltipContent='delete page' tooltipPosition='top-right' />
                <Icon name='save' onClick={saveMd} disabled={!mdPage?.canWrite} tooltipContent='save edited page' tooltipPosition='top-right' />
                <Icon name='cancel' onClick={cancelEdit} tooltipContent='cancel edit' tooltipPosition='top-right' />
            </div>
            <div className='markdown-edit-source'>
                <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
            </div>
        </Suspense>
    );
};
