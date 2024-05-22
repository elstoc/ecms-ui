import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Component } from './Component';
import { Auth } from '../../auth';
import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

export const Components: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();
    const siteConfig = useSiteConfig();

    return (
        <Routes>
            {siteComponents.map((metadata) => (
                <Route
                    key={metadata.apiPath}
                    path={`${metadata.uiPath}/*`}
                    element={<Component metadata={metadata} />}
                />
            ))}
            {siteConfig.authEnabled &&
                <Route path='auth/*' element={<Auth />} />
            }
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};
