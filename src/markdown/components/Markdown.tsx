import React, { createContext, FC, ReactElement, Suspense, useState } from 'react';

import { useTitle } from '../../common/hooks';
import { MarkdownMetadata } from '../../site/api';

import { ContentOnly, ContentWithSidebar } from '../../common/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownRoutes } from './MarkdownRoutes';

type MarkdownProps = {
    navOpen: boolean;
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MarkdownContext = createContext<MarkdownProps>({} as MarkdownProps);

export const Markdown: FC<MarkdownMetadata> = ({ apiPath, title, singlePage }): ReactElement => {
    const [navOpen, setNavOpen] = useState(false);
    useTitle(title);

    const contentElement = (
        <Suspense>
            <MarkdownRoutes rootApiPath={apiPath} singlePage={singlePage} />
        </Suspense>
    );

    if (singlePage) {
        return (
            <MarkdownContext.Provider value={{navOpen, setNavOpen}}>
                <ContentOnly contentElement={contentElement} />
            </MarkdownContext.Provider>
        );
    }

    const sidebarElement = (
        <Suspense>
            <MarkdownNav rootApiPath={apiPath} />
        </Suspense>
    );

    return (
        <MarkdownContext.Provider value={{navOpen, setNavOpen}}>
            <ContentWithSidebar contentElement={contentElement} sidebarElement={sidebarElement} mobileSidebarAtTop={true} />
        </MarkdownContext.Provider>
    );
};
