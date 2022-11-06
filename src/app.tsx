import './app.css';
import React, { ReactElement } from 'react';
import GalleryPage from './components/gallery/Gallery';

const App = (): ReactElement => {
    return (
        <>
            <header>
                Chris Elston's Home Page
            </header>
            <GalleryPage />
            <footer>
                2022
            </footer>
        </>
    );
};

export default App;
