import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ComponentMetadata } from '../types/Site';

import { Gallery } from './gallery/Gallery';
import { Markdown } from './markdown/Markdown';

export const SiteRoutes: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
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
        } else {
            return (
                <Route
                    key={component.apiPath}
                    path={`${component.uiPath}/*`}
                    element={<Markdown
                        apiPath={component.apiPath}
                        title={component.title}
                        includeNav={component.additionalData.includeNav as boolean}
                    />}
                />
            );
        }
    });
    return (
        <Routes>
            {siteRoutes}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};
