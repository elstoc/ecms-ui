import React, { ReactElement } from 'react';

import { Components } from './components/site/Components';
import { useSiteComponents } from './hooks/useApiQueries';
import { Footer } from './components/site/Footer';
import { Header } from './components/site/Header';
import { HandleQueryState } from './components/utils/HandleQueryState';

import './app.scss';
import 'modern-normalize';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export const App = (): ReactElement => {
    const [ queryState, siteComponents ] = useSiteComponents();

    return (
        <div className='app'>
            <HandleQueryState {...queryState}>
                <div className='header-container'>
                    <Header siteComponents={siteComponents!} />
                </div>
                <div className='component-container'>
                    <Components siteComponents={siteComponents} />
                </div>
                <div className='footer-container'>
                    <Footer />
                </div>
            </HandleQueryState>
        </div>
    );
};
