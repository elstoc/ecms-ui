import React, { FC, ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import { Gallery } from './gallery/Gallery';
import { Markdown } from './markdown/Markdown';

type SiteRouteProps = {
    siteProps: SiteProps
};

export const SiteRoutes: FC<SiteRouteProps> = ({ siteProps }): ReactElement => {
    const siteRoutes = siteProps.map((props) => {
        if (props.type === 'gallery') {
            return (
                <Route
                    key={props.apiPath}
                    path={`${props.uiPath}/*`}
                    element={<Gallery uiPath={props.uiPath} apiPath={props.apiPath} title={props.title} marginPx={props.marginPx} batchSize={props.batchSize} threshold={props.threshold} />}
                />
            );
        } else {
            return (
                <Route
                    key={props.apiPath}
                    path={`${props.uiPath}/*`}
                    element={<Markdown uiPath={props.uiPath} apiPath={props.apiPath} title={props.title} includeNav={props.includeNav} />}
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
