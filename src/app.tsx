import React, { ReactElement } from 'react';

import { Components } from './components/site/Components';
import { useSiteComponents } from './hooks/useApiQueries';
import { Footer } from './components/site/Footer';
import { Header } from './components/site/Header';
import { FocusStyleManager } from '@blueprintjs/core';

import './app.scss';
import 'modern-normalize';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

FocusStyleManager.onlyShowFocusOnTabs();

export const App = (): ReactElement => {
    const siteComponents = useSiteComponents();

    return (
        <div className='app'>
            <div className='header-container'>
                <Header siteComponents={siteComponents!} />
            </div>
            <div className='component-container'>
                <Components siteComponents={siteComponents} />
            </div>
            <div className='footer-container'>
                <Footer />
            </div>
        </div>
    );
};
