import React, { ReactElement } from 'react';

import './app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SiteRoutes from './components/SiteRoutes';
import { SiteProps } from './types/Site';

const siteProps: SiteProps = [
    {
        path: 'portfolio',
        marginPx: 3,
        type: 'gallery',
    },
    {
        path: 'markdown-testing',
        type: 'markdown'
    },
    {
        path: '',
        type: 'markdown'
    }
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
