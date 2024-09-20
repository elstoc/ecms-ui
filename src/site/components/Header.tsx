import React, { FC, ReactElement, Suspense } from 'react';

import { SiteNav } from './SiteNav';
import { UserInfo } from '../../auth';
import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

import './Header.scss';

export const Header: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();
    const { siteTitle } = useSiteConfig();

    return (
        <Suspense>
            <div className='header'>
                <div className='nav-title'>
                    {siteTitle && <div className='site-title'>{siteTitle}</div>}
                    <SiteNav siteComponents={siteComponents}/>
                </div>
                <UserInfo />
            </div>
        </Suspense>
    );
};
