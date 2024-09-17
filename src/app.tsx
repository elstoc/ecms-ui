import React, { ReactElement } from 'react';

import { SiteRoutes, Header, Footer } from './site';
import { FocusStyleManager } from '@blueprintjs/core';

import 'modern-normalize';
import '@blueprintjs/core/lib/css/blueprint.css';
import './app.scss';

FocusStyleManager.onlyShowFocusOnTabs();

export const App = (): ReactElement => {
    return (
        <div className='app'>
            <div className='app-header'>
                <Header />
            </div>
            <div className='app-component'>
                <SiteRoutes />
            </div>
            <div className='app-footer'>
                <Footer />
            </div>
        </div>
    );
};
