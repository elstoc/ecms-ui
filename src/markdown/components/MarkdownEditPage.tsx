import React, { FC, ReactElement, Suspense, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Icon } from '../../common/components/icon';
import { MarkdownPage, deleteMarkdownPage, putMarkdownPage } from '../api';
import { AppToaster } from '../../common/components/toaster';

import './MarkdownEditPage.scss';

const EditMd = React.lazy(() => import('../../common/components/editmd/EditMdAsDefault'));

type MarkdownEditPageProps = {
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
            (await AppToaster).show({ message: 'page saved', timeout: 2000 });
            await queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
            await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
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
                (await AppToaster).show({ message: 'page deleted', timeout: 2000 });
                await queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
                await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
                unsetEditMode();
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [mdFullPath, queryClient, unsetEditMode]);

    return (
        <Suspense>
            <div className='markdown-toolbox'>
                <Icon name='cancel' onClick={cancelEdit} tooltipContent='cancel edit' tooltipPosition='top-right' />
                <Icon name='save' onClick={saveMd} disabled={!mdPage?.canWrite} tooltipContent='save edited page' tooltipPosition='top-right' />
                <Icon name='delete' disabled={!mdPage?.canDelete} onClick={deleteMd} tooltipContent='delete page' tooltipPosition='top-right' />
            </div>
            <div className='markdown-edit-source'>
                <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
            </div>
        </Suspense>
    );
};
