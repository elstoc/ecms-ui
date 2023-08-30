import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteNav } from './components/site/SiteNav';
import { SiteRoutes } from './components/site/SiteRoutes';
import { useSiteNav } from './hooks/siteQueries';

const App = (): ReactElement => {

    const { isLoading, isError, data: componentMetadata } = useSiteNav();

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>There has been an ERROR!</div>;

    return (
        <div className='app'>
            <div className='header'>
                <SiteNav componentMetadata={componentMetadata}/>
            </div>
            <div className='content'>
                <SiteRoutes componentMetadata={componentMetadata} />
            </div>
            <div className='footer'>
                C Elston 2023
            </div>
        </div>
    );
};

export default App;
