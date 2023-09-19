import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@primer/react';

import { App } from './app';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('app-container')!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster />
            </BrowserRouter>
        </QueryClientProvider>
    </ThemeProvider>
);
