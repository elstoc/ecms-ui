import React, { FC, ReactElement } from 'react';

import { useSiteConfig } from '../hooks/useSiteQueries';

import './Footer.scss';

export const Footer: FC = (): ReactElement => {
    const siteConfig = useSiteConfig();
    return (
        <div className='footer'>
            {siteConfig.footerText}
        </div>
    );
};
