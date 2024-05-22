import React, { ReactElement } from 'react';

import { Components, Header, Footer } from './site';
import { FocusStyleManager } from '@blueprintjs/core';

import './app.scss';
import 'modern-normalize';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

FocusStyleManager.onlyShowFocusOnTabs();

export const App = (): ReactElement => {
    return (
        <div className='app'>
            <div className='header-container'>
                <Header />
            </div>
            <div className='component-container'>
                <Components />
            </div>
            <div className='footer-container'>
                <Footer />
            </div>
        </div>
    );
};
