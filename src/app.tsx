import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './app.css';
import Gallery, { GalleryProps } from './components/gallery/Gallery';
import Markdown, { MarkdownProps } from './components/markdown/Markdown';

type SiteProps = (GalleryProps & {type: 'gallery'} | MarkdownProps & {type: 'markdown'})[];

const siteProps: SiteProps = [
    {
        path: 'portfolio',
        margin: 3,
        type: 'gallery',
    },
    {
        path: 'markdown-testing',
        type: 'markdown'
    }
];

const App = (): ReactElement => {
    const siteRoutes = siteProps.map((props) => {
        let element: ReactElement;
        if (props.type === 'gallery') {
            element = <Gallery path={props.path} margin={props.margin} />;
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
        <>
            <header>
                Chris Elston's Home Page
            </header>
            <Routes>
                {siteRoutes}
            </Routes>
            <footer>
                2022
            </footer>
        </>
    );
};

export default App;
