import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ComponentMetadata } from '../../types/Site';

import { Gallery } from '../gallery/Gallery';
import { Markdown } from '../markdown/Markdown';
import { Auth } from '../auth/Auth';
import { VideoDb } from '../videodb/VideoDb';
import { useSiteConfig } from '../../hooks/useApiQueries';

export const SiteRoutes: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    const [, siteConfig] = useSiteConfig();

    const siteRoutes = componentMetadata
        .map((component) => {
            const { type, uiPath, apiPath, title } = component;
            const pathAndTitle = { apiPath, title };

            let element: React.JSX.Element;
            if (type === 'gallery') {
                element = (
                    <Gallery
                        {...pathAndTitle}
                        marginPx={component.additionalData.marginPx as number}
                        batchSize={component.additionalData.batchSize as number}
                        threshold={component.additionalData.threshold as number}
                    />
                );
            } else if (type === 'markdown') {
                element = (
                    <Markdown
                        {...pathAndTitle}
                        includeNav={component.additionalData.includeNav as boolean}
                    />
                );
            } else if (type === 'videodb') {
                element = (
                    <VideoDb {...pathAndTitle} />
                );
            } else {
                throw new Error(`incompatible component type ${type}`);
            }

            return <Route key={apiPath} path={`${uiPath}/*`} element={element} />;
        });

    return (
        <Routes>
            {siteRoutes}
            {siteConfig?.authEnabled &&
                <Route path='auth/*' element={<Auth />} />
            }
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};
