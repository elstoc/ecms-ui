/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, Suspense, useState } from 'react';

import { useMarkdownPage } from '../hooks/useMarkdownQueries';

import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownEditPage.scss';

const EditMd = React.lazy(() => import('../../common/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage: FC<{ mdFullPath: string}> = ({ mdFullPath }): ReactElement => {
    const mdPage = useMarkdownPage(mdFullPath);
    const [editedMarkdown, setEditedMarkdown] = useState(mdPage.content ?? '');

    return (
        <Suspense>
            <MarkdownToolbox mdFullPath={mdFullPath} editedMarkdown={editedMarkdown}>
                <div className='markdown-edit-source'>
                    <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
                </div>
            </MarkdownToolbox>
        </Suspense>
    );
};
