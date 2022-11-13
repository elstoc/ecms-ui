import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ImageData } from './IGallery';
import './GalleryThumb.css';

const apiUrl: string = process.env.API_URL || '';

type GalleryThumbProps = {
    path: string;
    image: ImageData;
    margin: number;
}

const GalleryThumb: FC<GalleryThumbProps> = ({ image, margin, path }): ReactElement => {
    const style = {
        width: `${image.galleryDimensions!.width}px`,
        height: `${image.galleryDimensions!.height}px`,
        margin: `${margin}px`,
    };

    let imageDesc = image.exif.title || '';

    if (image.exif.dateTaken) {
        const exifDate = new Date(image.exif.dateTaken);
        imageDesc += ` (${exifDate.toLocaleDateString('default', { month: 'short' })} ${exifDate.getFullYear()})`;
    }

    return (
        <div className='thumbContainer' style={style}>
            <Link to={`./${image.fileName}`} replace={true}>
                <img
                    src={`${apiUrl}/gallery/image/${path}/${image.fileName}`}
                    alt={image.fileName}
                />
                <div className='overlay'>{imageDesc}</div>
            </Link>
        </div>
    );
};

export default GalleryThumb;
