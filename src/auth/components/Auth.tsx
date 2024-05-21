import React, { FC, ReactElement, Suspense } from 'react';

import { AuthContent } from './AuthContent';

export const Auth: FC = (): ReactElement => {
    return (
        <Suspense fallback='Loading...'>
            <AuthContent />
        </Suspense>
    );
};
