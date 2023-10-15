import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { MarkdownEditSource } from './MarkdownEditSource';
import { Icon } from '../utils/Icon';
import { putMarkdownPage } from '../../api';
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

    const saveMd = useCallback(async () => {
        try {
            await putMarkdownPage(mdFullPath, editedMarkdown);
            queryClient.invalidateQueries({ queryKey: ['markdownFile', mdFullPath]});
            queryClient.invalidateQueries({ queryKey: ['markdownTree']});
            toast('page saved');
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, mdFullPath, queryClient]);

    return (
        <>
            <div className='markdown-toolbox'>
                <Icon name='cancel' onClick={unsetEditMode} tooltipContent='cancel edit'/>
                <Icon name='save' onClick={saveMd} tooltipContent='save edited page'/>
            </div>
            <MarkdownEditSource markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
        </>
    );
};
