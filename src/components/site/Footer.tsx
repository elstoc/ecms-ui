import React, { FC, ReactElement } from 'react';

import './Footer.css';
import { useSiteConfig } from '../../hooks/useApiQueries';

export const Footer: FC = (): ReactElement => {
    const siteConfig = useSiteConfig();
    return (
        <div className='footer'>
            {siteConfig.footerText}
        </div>
    );
};
