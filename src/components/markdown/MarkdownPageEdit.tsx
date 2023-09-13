import React, { FC, ReactElement, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import './MarkdownPageEdit.scss';
import { Icon } from '../site/Icon';
import { useSearchParams } from 'react-router-dom';

export const MarkdownPageEdit: FC<{ markdown: string; }> = ({ markdown }): ReactElement => {
    const [, setSearchParams] = useSearchParams();

    const saveMd = useCallback(() => (
        alert('not really saved but you get the idea')
    ), []);

    const hideSource = useCallback(() => (
        setSearchParams()
    ), [setSearchParams]);

    return (
        <>
            <div className='markdown-page-toolbox'>
                <Icon name='cancel' onClick={hideSource} tooltipContent='cancel edit'/>
                <Icon name='save' onClick={saveMd} tooltipContent='save edited page'/>
            </div>
            <div className='markdown-page-edit'>
                <CodeMirror height='100%' value={markdown} extensions={[codeMirrorMarkdown({ base: markdownLanguage, codeLanguages: languages}), EditorView.lineWrapping]} />
            </div>
        </>
    );
};
