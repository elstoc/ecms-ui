import React, { ReactElement } from 'react';

import './app.scss';
import 'modern-normalize';
import { SiteRoutes } from './components/site/SiteRoutes';
import { useSiteComponents } from './hooks/useApiQueries';
import { Footer } from './components/site/Footer';
import { Header } from './components/site/Header';
import { HandleQueryState } from './components/utils/HandleQueryState';

export const App = (): ReactElement => {
    const [ queryState, componentMetadata ] = useSiteComponents();

    return (
        <div className='app'>
            <HandleQueryState {...queryState}>
                <div className='header-container'>
                    <Header componentMetadata={componentMetadata!} />
                </div>
                <div className='component-container'>
                    <SiteRoutes componentMetadata={componentMetadata!} />
                </div>
                <div className='footer-container'>
                    <Footer />
                </div>
            </HandleQueryState>
        </div>
    );
};
