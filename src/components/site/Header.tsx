import React, { FC, ReactElement } from 'react';
import { ComponentMetadata } from '../../types/Site';
import { SiteNav } from './SiteNav';

import './Header.css';

export const Header: FC<{ componentMetadata: ComponentMetadata[]; }> = ({ componentMetadata }): ReactElement => {
    return (
        <div className='header'>
            <SiteNav componentMetadata={componentMetadata}/>
        </div>
    );
};
