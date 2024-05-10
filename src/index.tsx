import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@primer/react';

import { App } from './app';

const queryDefaults = {
    defaultOptions: {
        queries: {
            retry: 2,
            keepPreviousData: true
        }
    }
};
const queryClient = new QueryClient(queryDefaults);

const container = document.getElementById('app-container')!;
const root = createRoot(container);

root.render(
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </ThemeProvider>
);
