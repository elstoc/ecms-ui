import './app.css';
import React from 'react';
import GalleryPage from './components/gallery/Gallery';

const App = () => {
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
