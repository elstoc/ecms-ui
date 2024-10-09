import React, { FC, ReactElement } from 'react';

import { useTitle } from '../../shared/hooks';
import { MarkdownMetadata } from '../../site/api';

import { MarkdownStateContext, useMarkdownState } from '../hooks/useMarkdownStateContext';
import { MarkdownContent } from './MarkdownContent';

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, singlePage }): ReactElement => {
    const { markdownState, markdownReducer } = useMarkdownState(apiPath, singlePage);
    useTitle(title);

    return (
        <MarkdownStateContext.Provider value={{ markdownState, markdownReducer}}>
            <MarkdownContent />
        </MarkdownStateContext.Provider>
    );
};
