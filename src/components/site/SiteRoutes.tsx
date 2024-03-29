import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ComponentMetadata } from '../../types/Site';

import { Gallery } from '../gallery/Gallery';
import { Markdown } from '../markdown/Markdown';
import { Auth } from '../auth/Auth';
import { useSiteConfig } from '../../hooks/useApiQueries';

export const SiteRoutes: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    const [, siteConfig] = useSiteConfig();

    const siteRoutes = componentMetadata.map((component) => {
        if (component.type === 'gallery') {
            return (
                <Route
                    key={component.apiPath}
                    path={`${component.uiPath}/*`}
                    element={<Gallery
                        apiPath={component.apiPath}
                        title={component.title}
                        marginPx={component.additionalData.marginPx as number}
                        batchSize={component.additionalData.batchSize as number}
                        threshold={component.additionalData.threshold as number}
                    />}
                />
            );
        } else if (component.type === 'markdown') {
            return (
                <Route
                    key={component.apiPath}
                    path={`${component.uiPath}/*`}
                    element={<Markdown
                        componentApiPath={component.apiPath}
                        title={component.title}
                        includeNav={component.additionalData.includeNav as boolean}
                    />}
                />
            );
        } else if (component.type === 'videodb') {
            return (
                <Route
                    key={component.apiPath}
                    path={`${component.uiPath}/*`}
                    element={<div>videodb component not yet implemented</div>}
                />
            );
        }
        throw new Error(`incompatible component type ${component.type}`);
    });
    return (
        <Routes>
            {siteRoutes}
            {siteConfig?.authEnabled && <Route path='auth/*' element={<Auth />} />}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};
