import React, { createContext, FC, ReactElement, Suspense, useState } from 'react';

import { useTitle } from '../../common/hooks';
import { MarkdownMetadata } from '../../site/api';

import { ContentOnly, ContentWithSidebar } from '../../common/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownRoutes } from './MarkdownRoutes';

type MarkdownPagesProps = {
    navOpen: boolean;
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MarkdownPagesContext = createContext<MarkdownPagesProps>({} as MarkdownPagesProps);

export const MarkdownPages: FC<MarkdownMetadata> = ({ apiPath, title, singlePage }): ReactElement => {
    const [navOpen, setNavOpen] = useState(false);
    useTitle(title);

    const contentElement = (
        <Suspense>
            <MarkdownRoutes rootApiPath={apiPath} singlePage={singlePage} />
        </Suspense>
    );

    if (singlePage) {
        return (
            <MarkdownPagesContext.Provider value={{navOpen, setNavOpen}}>
                <ContentOnly contentElement={contentElement} />
            </MarkdownPagesContext.Provider>
        );
    }

    const sidebarElement = (
        <Suspense>
            <MarkdownNav rootApiPath={apiPath} />
        </Suspense>
    );

    return (
        <MarkdownPagesContext.Provider value={{navOpen, setNavOpen}}>
            <ContentWithSidebar contentElement={contentElement} sidebarElement={sidebarElement} mobileSidebarAtTop={true} />
        </MarkdownPagesContext.Provider>
    );
};
