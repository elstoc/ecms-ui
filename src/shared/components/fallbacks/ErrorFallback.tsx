import React, { ReactElement } from 'react';
import { FC } from 'react';

export const ErrorFallback: FC<{ error: unknown }> = ({ error }): ReactElement => {
    const { message, stack } = error instanceof Error ? error : { message: 'Unknown', stack: ''};
    return (
        <div role="alert">
            <h3>Something went wrong</h3>
            <pre style={{ color: 'red' }}>{message}</pre>
            <pre style={{ color: 'red' }}>{stack}</pre>
        </div>
    );
};
