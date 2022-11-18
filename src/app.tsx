import React, { ReactElement } from 'react';

import './app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SiteRoutes from './components/SiteRoutes';
import { GalleryProps } from './components/gallery/Gallery';
import { MarkdownProps } from './components/markdown/Markdown';

export type SiteProps = (GalleryProps & {type: 'gallery'} | MarkdownProps & {type: 'markdown'})[];

const siteProps: SiteProps = [
    {
        path: 'portfolio',
        marginPx: 3,
        type: 'gallery',
    },
    {
        path: 'markdown-testing',
        type: 'markdown'
    }
];

const App = (): ReactElement => {
    return (
        <>
            <Header />
            <SiteRoutes siteProps={siteProps} />
            <Footer />
        </>
    );
};

export default App;
