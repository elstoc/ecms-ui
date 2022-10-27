import './app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import GalleryPage from './components/gallery/galleryPage';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(
    <>
        <header>
            Some Header
        </header>
        <GalleryPage />
        <footer>
            Some Footer
        </footer>
    </>
);
