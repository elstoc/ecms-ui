import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
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
        <div className='app'>
            <header>
                <Header siteProps={siteProps}/>
            </header>
            <div className='content'>
                <SiteRoutes siteProps={siteProps} />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default App;
