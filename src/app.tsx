import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteRoutes } from './components/site/SiteRoutes';
import { useSiteNav } from './hooks/siteQueries';
import { Footer } from './components/site/Footer';
import { Header } from './components/site/Header';

export const App = (): ReactElement => {
    const { isLoading, isError, data: componentMetadata } = useSiteNav();

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>There has been an ERROR!</div>;

    return (
        <div className='app'>
            <div className='header-container'>
                <Header componentMetadata={componentMetadata}/>
            </div>
            <div className='component-container'>
                <SiteRoutes componentMetadata={componentMetadata} />
            </div>
            <div className='footer-container'>
                <Footer />
            </div>
        </div>
    );
};
