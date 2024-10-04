/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, Suspense, useContext, useState } from 'react';

import { useMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from './MarkdownContent';

import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownEditPage.scss';

const EditMd = React.lazy(() => import('../../common/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage: FC = (): ReactElement => {
    const { apiPath } = useContext(MarkdownStateContext);
    const mdPage = useMarkdownPage(apiPath);
    const [editedMarkdown, setEditedMarkdown] = useState(mdPage.content ?? '');

    return (
        <Suspense>
            <MarkdownToolbox editedMarkdown={editedMarkdown}>
                <div className='markdown-edit-source'>
                    <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
                </div>
            </MarkdownToolbox>
        </Suspense>
    );
};
