/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, Suspense, useContext, useEffect } from 'react';

import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownEditPage.scss';

const EditMd = React.lazy(() => import('../../shared/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const { markdownState: { editedMarkdown }, markdownReducer} = useContext(MarkdownStateContext);
    const mdPage = useMarkdownPage(apiPath);

    const setEditedMarkdown = (value: string) => markdownReducer({ key: 'editedMarkdown', value });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setEditedMarkdown(mdPage.content), []);

    return (
        <Suspense>
            <div className='markdown-edit-source'>
                <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
            </div>
        </Suspense>
    );
};
