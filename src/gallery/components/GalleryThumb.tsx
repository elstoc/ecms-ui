import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import './GalleryThumb.scss';

type GalleryThumbProps = {
    fileName: string;
    description: string;
    thumbSrcUrl: string;
    widthPx: number;
    heightPx: number;
    marginPx: number;
    ref?: React.RefObject<HTMLAnchorElement> | null;
}

export const GalleryThumb = forwardRef<HTMLAnchorElement, GalleryThumbProps>(({ fileName, description, thumbSrcUrl, widthPx, heightPx, marginPx }, ref) => {
    const style = {
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        marginRight: `${marginPx}px`
    };

    return (
        <Link
            to={`?image=${fileName}`}
            replace={true}
            className='gallery-thumb'
            style={style}
            ref={ref}
        >
            <img
                src={thumbSrcUrl}
                alt={fileName}
            />
            <div className='overlay'>{description}</div>
        </Link>
    );
});
