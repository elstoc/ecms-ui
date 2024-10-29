import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';
import { useGetMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

export const MarkdownPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const { markdownReducer } = useContext(MarkdownStateContext);
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');
    const mdPage = useGetMarkdownPage(apiPath);

    useEffect(() => {
        const pageDetails = { currentPage: mdPage, editedMarkdown: mdPage.content, pageApiPath: apiPath };
        markdownReducer({ key: 'currentPageDetails', value: pageDetails});
    }, [markdownReducer, mdPage, apiPath]);

    return (
        <>
            {mode === 'edit' ? <MarkdownEditPage /> : <MarkdownViewPage />}
            <MarkdownAddPage />
        </>
    );
};
