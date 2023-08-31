import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { GalleryImage } from './GalleryImage';

import './GalleryThumb.scss';

type GalleryThumbProps = {
    fileName: string;
    description: string;
    srcUrl: string;
    widthPx: number;
    heightPx: number;
    marginPx: number;
}

export const GalleryThumb = forwardRef<HTMLAnchorElement, GalleryThumbProps>(({ fileName, description, srcUrl, widthPx, heightPx, marginPx }, ref) => {
    const style = {
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        margin: `${marginPx}px`,
    };

    return (
        <Link
            to={`./${fileName}`}
            replace={true}
            className='gallery-thumb'
            style={style}
            ref={ref}
        >
            <GalleryImage
                url={srcUrl}
                alt={fileName}
            />
            <div className='overlay'>{description}</div>
        </Link>
    );
});
