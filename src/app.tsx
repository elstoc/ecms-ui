import React, { ReactElement } from 'react';

import { Components } from './site/components/Components';
import { useSiteComponents } from './site/hooks/useSiteQueries';
import { Footer } from './site/components/Footer';
import { Header } from './site/components/Header';
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
