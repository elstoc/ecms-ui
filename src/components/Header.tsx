import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { SiteProps } from '../types/Site';

import './Header.css';

type HeaderProps = {
    siteProps: SiteProps
};

const Header: FC<HeaderProps> = ({ siteProps }): ReactElement => {
    const headerLinks = siteProps.map((props) =>
        <Link to={props.path} key={props.path}>{props.title}</Link>
    );
    return (
        <header>
            <div>Chris Elston's Home Page</div>
            <div>
                {headerLinks}
            </div>
        </header>
    );
};

export default Header;
