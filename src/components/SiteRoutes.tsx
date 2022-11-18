import React, { FC, ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';
import { SiteProps } from '../app';

import Gallery from './gallery/Gallery';
import Markdown from './markdown/Markdown';

const SiteRoutes: FC<{ siteProps: SiteProps }> = ({ siteProps }): ReactElement => {
    const siteRoutes = siteProps.map((props) => {
        let element: ReactElement;
        if (props.type === 'gallery') {
            element = <Gallery path={props.path} marginPx={props.marginPx} />;
        } else {
            element = <Markdown path={props.path} />;
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
