import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import './GalleryThumb.scss';

type GalleryThumbProps = {
    fileName: string;
    description: string;
    url: string;
    ref?: React.RefObject<HTMLAnchorElement> | null;
}

export const GalleryThumb = forwardRef<HTMLAnchorElement, GalleryThumbProps>(({ fileName, description, url }, ref) => {
    return (
        <Link
            to={`?image=${fileName}`}
            replace={true}
            className='gallery-thumb'
            ref={ref}
        >
            <img src={url} alt={fileName} />
            <div className='overlay'>{description}</div>
        </Link>
    );
});
