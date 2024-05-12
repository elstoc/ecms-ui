import React, { FC, ReactElement } from 'react';

import { ComponentMetadata } from '../../types/Site';
import { Nav } from './Nav';
import { ToolBox } from './ToolBox';

import './Header.css';

export const Header: FC<{ siteComponents: ComponentMetadata[]; }> = ({ siteComponents }): ReactElement => {
    return (
        <div className='header'>
            <div className='header-sitenav'>
                <Nav siteComponents={siteComponents}/>
            </div>
            <div className='header-toolbox'>
                <ToolBox />
            </div>
        </div>
    );
};
