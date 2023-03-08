import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteNav } from './components/SiteNav';
import { SiteRoutes } from './components/SiteRoutes';
import { useSiteNav } from './hooks/siteQueries';

const App = (): ReactElement => {

    const { isLoading, isError, data: componentMetadata } = useSiteNav();

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>There has been an ERROR!</div>;

    return (
        <div className='app'>
            <header>
                <SiteNav componentMetadata={componentMetadata}/>
            </header>
            <div className='content'>
                <SiteRoutes componentMetadata={componentMetadata} />
            </div>
            <footer>
                C Elston 2023
            </footer>
        </div>
    );
};

export default App;
