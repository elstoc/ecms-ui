import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ComponentMetadata } from '../types/Site';

import { Gallery } from './gallery/Gallery';
import { Markdown } from './markdown/Markdown';

export const SiteRoutes: FC<{ componentMetadata: ComponentMetadata[] }> = ({ componentMetadata }): ReactElement => {
    const siteRoutes = componentMetadata.map((props) => {
        if (props.type === 'gallery') {
            return (
                <Route
                    key={props.apiPath}
                    path={`${props.uiPath}/*`}
                    element={<Gallery apiPath={props.apiPath} title={props.title} marginPx={props.marginPx as number} batchSize={props.batchSize as number} threshold={props.threshold as number} />}
                />
            );
        } else {
            return (
                <Route
                    key={props.apiPath}
                    path={`${props.uiPath}/*`}
                    element={<Markdown apiPath={props.apiPath} title={props.title} includeNav={props.includeNav as boolean} />}
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
