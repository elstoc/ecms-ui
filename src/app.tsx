import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './app.css';
import Gallery from './components/gallery/Gallery';
import Markdown from './components/markdown/Markdown';

const App = (): ReactElement => {
    return (
        <>
            <header>
                Chris Elston's Home Page
            </header>
            <Routes>
                <Route
                    path="portfolio/*"
                    element={<Gallery path="portfolio" margin={3} />}
                />
                <Route
                    path="markdown-testing/*"
                    element={<Markdown path='markdown-testing' />}
                />
                <Route
                    path="*"
                    element={<Navigate to="portfolio" replace />}
                />
            </Routes>
            <footer>
                2022
            </footer>
        </>
    );
};

export default App;
