import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { ImageData } from '../../types/Gallery';
import './GalleryThumb.css';

type GalleryThumbProps = {
    path: string;
    title: string;
    image: ImageData;
    resizeRatio: number;
    marginPx: number;
}

export const GalleryThumb = forwardRef<HTMLImageElement, GalleryThumbProps>(({ image, marginPx, path, resizeRatio }, ref) => {
    const style = {
        width: `${Math.trunc(image.thumbDimensions.width * resizeRatio)}px`,
        height: `${Math.trunc(image.thumbDimensions.height * resizeRatio)}px`,
        margin: `${marginPx}px`,
    };

    return (
        <Link to={`./${image.fileName}`} replace={true} className='thumbContainer' style={style}>
            <img
                src={image.thumbSrcUrl}
                alt={image.fileName}
                ref={ref}
            />
            <div className='overlay'>{image.description}</div>
        </Link>
    );
});
