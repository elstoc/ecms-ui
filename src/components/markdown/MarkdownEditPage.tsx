import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

import { MarkdownEditSource } from './MarkdownEditSource';
import { Icon } from '../utils/Icon';
import { apiSecure } from '../../utils/apiClient';

export const MarkdownEditPage: FC<{ markdown: string; apiPath: string }> = ({ markdown, apiPath }): ReactElement => {
    const queryClient = useQueryClient();
    const [editedMarkdown, setEditedMarkdown] = useState(markdown);
    const [, setSearchParams] = useSearchParams();

    const unsetEditMode = useCallback(() => setSearchParams(), [setSearchParams]);

    const saveMd = useCallback(async () => {
        try {
            await apiSecure.put(`markdown/mdFile/${apiPath.replace(/\/$/, '')}`, { fileContents: editedMarkdown });
            queryClient.invalidateQueries([`markdown/${apiPath}`]);
            toast('page saved');
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [editedMarkdown, apiPath, queryClient]);

    return (
        <>
            <div className='markdown-toolbox'>
                <Icon name='cancel' onClick={unsetEditMode} tooltipContent='cancel edit'/>
                <Icon name='save' onClick={saveMd} tooltipContent='save edited page'/>
            </div>
            <MarkdownEditSource markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
            <Toaster />
        </>
    );
};
