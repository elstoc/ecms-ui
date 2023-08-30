import React, { FC, ReactElement } from 'react';
import { ComponentMetadata } from '../../types/Site';
import { SiteNav } from './SiteNav';
import { ToolBox } from './ToolBox';

import './Header.css';

export const Header: FC<{ componentMetadata: ComponentMetadata[]; }> = ({ componentMetadata }): ReactElement => {
    return (
        <div className='header'>
            <div className='header-sitenav'>
                <SiteNav componentMetadata={componentMetadata}/>
            </div>
            <div className='header-toolbox'>
                <ToolBox />
            </div>
        </div>
    );
};
