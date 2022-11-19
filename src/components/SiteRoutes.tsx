import React, { FC, ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import Gallery from './gallery/Gallery';
import Markdown from './markdown/Markdown';

type SiteRouteProps = {
    siteProps: SiteProps
};

const SiteRoutes: FC<SiteRouteProps> = ({ siteProps }): ReactElement => {
    const siteRoutes = siteProps.map((props) => {
        let element: ReactElement;
        if (props.type === 'gallery') {
            element = <Gallery path={props.path} title={props.title} marginPx={props.marginPx} />;
        } else {
            element = <Markdown path={props.path} title={props.title} />;
        }
        return (
            <Route
                key={props.path}
                path={`${props.path}/*`}
                element={element}
            />
        );
    });
    return (
        <Routes>
            {siteRoutes}
        </Routes>
    );
};

export default SiteRoutes;
