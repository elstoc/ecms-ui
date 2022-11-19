import React, { FC, ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import Gallery from './gallery/Gallery';
import Markdown from './markdown/Markdown';
import MarkdownPage from './markdown/MarkdownPage';

type SiteRouteProps = {
    siteProps: SiteProps
};

const SiteRoutes: FC<SiteRouteProps> = ({ siteProps }): ReactElement => {
    const siteRoutes = siteProps.map((props) => {
        if (props.type === 'gallery') {
            return (
                <Route
                    key={props.path}
                    path={`${props.path}/*`}
                    element={<Gallery path={props.path} title={props.title} marginPx={props.marginPx} />}
                />
            );
        } else if (props.type === 'markdown') {
            return (
                <Route
                    key={props.path}
                    path={`${props.path}/*`}
                    element={<Markdown path={props.path} title={props.title} />}
                />
            );
        } else {
            return (
                <Route
                    key={props.path}
                    path={`${props.path}`}
                    element={<MarkdownPage path={props.path} title={props.title} />}
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

export default SiteRoutes;
