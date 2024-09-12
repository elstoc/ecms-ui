import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Component } from './Component';
import { useSiteComponents } from '../hooks/useSiteQueries';
import { ComponentMetadata, ComponentTypes } from '../api';

const listComponentRoutes = (components: ComponentMetadata[]): ReactElement[] => {
    const routes: ReactElement[] = [];
    components.forEach((metadata) => {
        if (metadata?.type === ComponentTypes.componentgroup) {
            routes.push(...listComponentRoutes(metadata.components));
        } else {
            routes.push((
                <Route
                    key={metadata.apiPath}
                    path={`${metadata.defaultComponent ? '/' : metadata.apiPath}/*`}
                    element={<Component metadata={metadata} />}
                />
            ));
        }
    });
    return routes;
};

export const Components: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();

    return (
        <Routes>
            {listComponentRoutes(siteComponents)}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};
