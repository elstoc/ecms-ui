import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteNav } from './components/SiteNav';
import { SiteRoutes } from './components/SiteRoutes';
import { useSiteNav } from './hooks/siteQueries';

const App = (): ReactElement => {

    const { isLoading, isError, data: siteProps } = useSiteNav();

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>There has been an ERROR!</div>;

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
