import React, { FC, ReactElement } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import './MarkdownPageEdit.scss';

export const MarkdownPageEdit: FC<{ markdown: string; }> = ({ markdown }): ReactElement => {
    return (
        <div className='markdown-page-edit'>
            <CodeMirror height='100%' value={markdown} extensions={[codeMirrorMarkdown({ base: markdownLanguage, codeLanguages: languages}), EditorView.lineWrapping]} />
        </div>
    );
};
