import React, { createContext, FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';

type MarkdownContextProps = {
    apiPath: string,
    singlePage: boolean
};

export const MarkdownStateContext = createContext<MarkdownContextProps>({} as MarkdownContextProps);

export const MarkdownContent: FC<{ apiPath: string, singlePage: boolean }> = ({ apiPath, singlePage }): ReactElement => {
    const [ searchParams ] = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <MarkdownStateContext.Provider value={{ apiPath, singlePage }}>
            {mode === 'edit'
                ? <MarkdownEditPage />
                : <MarkdownViewPage />}
            {mode === 'add' && <MarkdownAddPage />}
        </MarkdownStateContext.Provider>
    );
};
