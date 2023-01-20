import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteNav } from './components/SiteNav';
import { SiteRoutes } from './components/SiteRoutes';
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
