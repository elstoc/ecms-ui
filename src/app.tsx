import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteNav } from './components/SiteNav';
import { SiteRoutes } from './components/SiteRoutes';
import { SiteProps } from './types/Site';

const siteProps: SiteProps = [
    {
        uiPath: '',
        apiPath: 'home',
        title: 'Home',
        type: 'markdownPage'
    },
    {
        uiPath: 'portfolio',
        apiPath: 'portfolio',
        title: 'Portfolio Photos',
        marginPx: 2,
        batchSize: 50,
        threshold: 20,
        type: 'gallery',
    },
    {
        uiPath: 'markdown-testing',
        apiPath: 'markdown-testing',
        title: 'Markdown Testing',
        type: 'markdown'
    },
    {
        uiPath: 'about',
        apiPath: 'about',
        title: 'About',
        type: 'markdownPage'
    },
];

const App = (): ReactElement => {
    return (
        <div className='app'>
            <header>
                <SiteNav siteProps={siteProps}/>
            </header>
            <div className='content'>
                <SiteRoutes siteProps={siteProps} />
            </div>
            <footer>
                C Elston 2022
            </footer>
        </div>
    );
};

export default App;
