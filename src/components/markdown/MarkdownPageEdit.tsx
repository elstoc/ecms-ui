import React, { FC, ReactElement, useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import './MarkdownPageEdit.scss';
import { Icon } from '../site/Icon';
import { useSearchParams } from 'react-router-dom';

export const MarkdownPageEdit: FC<{ markdown: string; }> = ({ markdown }): ReactElement => {
    const [editedMarkdown, setEditedMarkdown] = useState(markdown);
    const [, setSearchParams] = useSearchParams();

    const saveMd = useCallback(() => (
        alert(`saving ${editedMarkdown.length} characters`)
    ), [editedMarkdown]);

    const unsetEditMode = () => setSearchParams();

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
        </>
    );
};
