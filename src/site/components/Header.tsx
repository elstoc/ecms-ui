import React, { FC, ReactElement, Suspense } from 'react';

import { SiteNav } from './SiteNav';
import { UserInfo } from '../../auth';
import { useSiteComponents } from '../hooks/useSiteQueries';

import './Header.scss';

export const Header: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();
    return (
        <Suspense>
            <div className='header'>
                <SiteNav siteComponents={siteComponents}/>
                <UserInfo />
            </div>
        </Suspense>
    );
};
