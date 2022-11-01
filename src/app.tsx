import './app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import GalleryPage from './components/gallery/Gallery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <header>
            Chris Elston's Home Page
        </header>
        <GalleryPage />
        <footer>
            2022
        </footer>
    </QueryClientProvider>
);
