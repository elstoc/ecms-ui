import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ComponentMetadata } from '../../types/Site';
import { Component } from './Component';
import { Auth } from '../../auth/components';
import { useSiteConfig } from '../../hooks/useApiQueries';

export const Components: FC<{ siteComponents: ComponentMetadata[] }> = ({ siteComponents }): ReactElement => {
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
