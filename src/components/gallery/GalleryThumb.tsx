import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import './GalleryThumb.css';

type GalleryThumbProps = {
    fileName: string;
    description: string;
    srcUrl: string;
    widthPx: number;
    heightPx: number;
    marginPx: number;
}

export const GalleryThumb = forwardRef<HTMLImageElement, GalleryThumbProps>(({ fileName, description, srcUrl, widthPx, heightPx, marginPx }, ref) => {
    const style = {
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        margin: `${marginPx}px`,
    };

    return (
        <Link to={`./${fileName}`} replace={true} className='thumbContainer' style={style}>
            <img
                src={srcUrl}
                alt={fileName}
                ref={ref}
            />
            <div className='overlay'>{description}</div>
        </Link>
    );
});
