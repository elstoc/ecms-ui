import React, { FC, ReactElement } from 'react';
import './MarkdownPageEdit.css';

export const MarkdownPageEdit: FC<{ markdown: string; }> = ({ markdown }): ReactElement => {
    return (
        <div className='markdown-page-edit'>
            <textarea defaultValue={markdown} />
        </div>
    );
};
