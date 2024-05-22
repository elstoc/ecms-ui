import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { App } from './app';
import { ErrorFallback } from './common/components/fallbacks';

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
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback='Loading...'>
                    <App />
                </Suspense>
            </ErrorBoundary>
        </BrowserRouter>
    </QueryClientProvider>
);
