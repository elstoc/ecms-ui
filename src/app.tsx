import React, { ReactElement } from 'react';

import { Components, Header, Footer } from './site';
import { FocusStyleManager } from '@blueprintjs/core';

import './app.scss';
import 'modern-normalize';
import '@blueprintjs/core/lib/css/blueprint.css';

FocusStyleManager.onlyShowFocusOnTabs();

export const App = (): ReactElement => {
    return (
        <div className='app'>
            <div className='app-header'>
                <Header />
            </div>
            <div className='app-component'>
                <Components />
            </div>
            <div className='app-footer'>
                <Footer />
            </div>
        </div>
    );
};
