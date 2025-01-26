import React, { FC, ReactElement } from 'react';

import { MarkdownMetadata } from '../../contracts/site.contract';
import { useTitle } from '../../shared/hooks';

import { MarkdownStateContext, useMarkdownState } from '../hooks/useMarkdownStateContext';
import { MarkdownRoutes } from './MarkdownRoutes';

export const Markdown: FC<MarkdownMetadata> = ({ uiPath, apiPath, title, singlePage }): ReactElement => {
    const { markdownState, markdownReducer } = useMarkdownState(uiPath, apiPath, singlePage);
    useTitle(title);

    return (
        <MarkdownStateContext.Provider value={{ markdownState, markdownReducer}}>
            <MarkdownRoutes />
        </MarkdownStateContext.Provider>
    );
};
