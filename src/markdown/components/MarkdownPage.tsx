import React, { createContext, FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';

type MarkdownPageProps = {
    apiPath: string,
    singlePage: boolean
};

export const MarkdownPageContext = createContext<MarkdownPageProps>({} as MarkdownPageProps);

export const MarkdownPage: FC<{ apiPath: string, singlePage: boolean }> = ({ apiPath, singlePage }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <MarkdownPageContext.Provider value={{ apiPath, singlePage }}>
            {mode === 'edit'
                ? <MarkdownEditPage />
                : <MarkdownViewPage />}
            {mode === 'add' && <MarkdownAddPage />}
        </MarkdownPageContext.Provider>
    );
};
