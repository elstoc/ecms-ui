import React, { FC, ReactElement } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';

import './MarkdownEditSource.scss';

type MarkdownEditSourceProps = {
    markdown: string;
    setMarkdown: (value: string) => void;
}

export const MarkdownEditSource: FC<MarkdownEditSourceProps> = ({ markdown, setMarkdown }): ReactElement => {
    return (
        <>
            <div className='markdown-edit-source'>
                <CodeMirror
                    height='100%'
                    value={markdown}
                    onChange={(value: string) => setMarkdown(value)}
                    extensions={[codeMirrorMarkdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
                />
            </div>
        </>
    );
};
