import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC<{ sourceComponent?: string }> = ({ sourceComponent }): ReactElement => {
    return <div>
        <h1>Four Oh Four</h1>
        <p>This {sourceComponent} page has not been found. Please go <Link to= '/'>home</Link>.</p>
    </div>;
};
