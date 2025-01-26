import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ComponentMetadata, ComponentTypes } from '../../contracts/site';
import { useSiteComponents } from '../hooks/useSiteQueries';

import { SiteComponent } from './SiteComponent';
import { NotFoundPage } from '../../shared/components/NotFoundPage';

const listComponentRoutes = (components: ComponentMetadata[]): ReactElement[] => {
    const routes: ReactElement[] = [];
    components.forEach((metadata) => {
        if (metadata?.type === ComponentTypes.componentgroup) {
            routes.push(...listComponentRoutes(metadata.components));
        } else {
            routes.push((
                <Route
                    key={metadata.apiPath}
                    path={metadata.uiPath + '/*'}
                    element={<SiteComponent metadata={metadata} />}
                />
            ));
        }
    });
    return routes;
};

export const SiteRoutes: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();

    return (
        <Routes>
            {listComponentRoutes(siteComponents)}
            <Route key='*' path='*' element={<NotFoundPage sourceComponent='root' />} />
        </Routes>
    );
};
