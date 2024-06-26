import React, { FC, ReactElement, Suspense } from 'react';

import { Nav } from './Nav';
import { ToolBox } from './ToolBox';
import { useSiteComponents } from '../hooks/useSiteQueries';

import './Header.css';

export const Header: FC = (): ReactElement => {
    const siteComponents = useSiteComponents();
    return (
        <Suspense fallback='Loading...' >
            <div className='header'>
                <div className='header-sitenav'>
                    <Nav siteComponents={siteComponents}/>
                </div>
                <div className='header-toolbox'>
                    <ToolBox />
                </div>
            </div>
        </Suspense>
    );
};
