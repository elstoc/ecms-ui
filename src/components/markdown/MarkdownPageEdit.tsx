import React, { FC, ReactElement, useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import toast, { Toaster } from 'react-hot-toast';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import './MarkdownPageEdit.scss';
import { Icon } from '../site/Icon';
import { useSearchParams } from 'react-router-dom';
import { apiSecure } from '../../utils/apiClient';
import { useQueryClient } from '@tanstack/react-query';

export const MarkdownPageEdit: FC<{ markdown: string; apiPath: string }> = ({ markdown, apiPath }): ReactElement => {
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
            <div className='markdown-page-toolbox'>
                <Icon name='cancel' onClick={unsetEditMode} tooltipContent='cancel edit'/>
                <Icon name='save' onClick={saveMd} tooltipContent='save edited page'/>
            </div>
            <div className='markdown-page-edit'>
                <CodeMirror
                    height='100%'
                    value={editedMarkdown}
                    onChange={(value: string) => setEditedMarkdown(value)}
                    extensions={[codeMirrorMarkdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
                />
            </div>
            <Toaster />
        </>
    );
};
