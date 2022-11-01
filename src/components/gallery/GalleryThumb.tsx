import React, { FC, ReactElement } from 'react';

import { ImageData } from './IGallery';
import './GalleryThumb.css';

const apiUrl: string = process.env.API_URL || '';

type GalleryThumbProps = {
    image: ImageData;
    margin: number;
}

const GalleryThumb: FC<GalleryThumbProps> = ({ image, margin }): ReactElement => {
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
            <img
                src={`${apiUrl}/gallery/image/portfolio/${image.fileName}`}
                alt={image.fileName}
            />
            <div className='overlay'>{imageDesc}</div>
        </div>
    );
};

export default GalleryThumb;
