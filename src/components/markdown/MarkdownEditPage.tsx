import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { MarkdownEditSource } from './MarkdownEditSource';
import { Icon } from '../utils/Icon';
import { deleteMarkdownPage, putMarkdownPage } from '../../api';
import { MarkdownPage } from '../../types/Markdown';

export type MarkdownEditPageProps = {
    mdFullPath: string;
    mdPage?: MarkdownPage;
};

export const MarkdownEditPage: FC<MarkdownEditPageProps> = ({ mdFullPath, mdPage }): ReactElement => {
    const queryClient = useQueryClient();
    const [editedMarkdown, setEditedMarkdown] = useState(mdPage?.content ?? '');
    const [, setSearchParams] = useSearchParams();

    const unsetEditMode = useCallback(() => setSearchParams(), [setSearchParams]);
    
    const cancelEdit = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        if (editedMarkdown === mdPage?.content || confirm('You have unsaved changes. Are you sure you wish to leave?')) {
            unsetEditMode();
        }
    }, [editedMarkdown, mdPage, unsetEditMode]);

    const saveMd = useCallback(async () => {
        try {
            await putMarkdownPage(mdFullPath, editedMarkdown);
            queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
            queryClient.invalidateQueries({ queryKey: ['markdownTree']});
            toast('page saved');
            unsetEditMode();
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, mdFullPath, queryClient, unsetEditMode]);

    const deleteMd = useCallback(async () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Are you sure you want to delete this page')) {
                await deleteMarkdownPage(mdFullPath);
                queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
                queryClient.invalidateQueries({ queryKey: ['markdownTree']});
                toast('page deleted');
                unsetEditMode();
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [mdFullPath, queryClient, unsetEditMode]);

    return (
        <>
            <div className='markdown-toolbox'>
                <Icon name='cancel' onClick={cancelEdit} tooltipContent='cancel edit'/>
                <Icon name='save' onClick={saveMd} disabled={!mdPage?.canWrite} tooltipContent='save edited page'/>
                <Icon name='delete' disabled={!mdPage?.canDelete} onClick={deleteMd} tooltipContent='delete page'/>
            </div>
            <MarkdownEditSource markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
        </>
    );
};
