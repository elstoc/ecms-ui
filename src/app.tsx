import React, { ReactElement } from 'react';

import './app.css';
import '../node_modules/modern-normalize/modern-normalize.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SiteRoutes from './components/SiteRoutes';
import { SiteProps } from './types/Site';

const siteProps: SiteProps = [
    {
        path: '',
        title: 'Home',
        type: 'markdownPage'
    },
    {
        path: 'portfolio',
        title: 'Portfolio Photos',
        marginPx: 3,
        batchSize: 50,
        threshold: 20,
        type: 'gallery',
    },
    {
        path: 'markdown-testing',
        title: 'Markdown Testing',
        type: 'markdown'
    },
    {
        path: 'about',
        title: 'About',
        type: 'markdownPage'
    },
];

const App = (): ReactElement => {
    return (
        <>
            <Header siteProps={siteProps}/>
            <SiteRoutes siteProps={siteProps} />
            <Footer />
        </>
    );
};

export default App;
