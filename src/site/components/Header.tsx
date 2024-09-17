import React, { FC, ReactElement, Suspense } from 'react';

import { Nav } from './Nav';
import { UserInfo } from '../../auth';
import { useSiteComponents } from '../hooks/useSiteQueries';

import './Header.scss';

export const Header: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();
    return (
        <Suspense>
            <div className='header'>
                <Nav siteComponents={siteComponents}/>
                <UserInfo />
            </div>
        </Suspense>
    );
};
