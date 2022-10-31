import React, { FC, ReactElement } from 'react';
import { ImageData } from './IGallery';
import './GalleryThumb.css';

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

    return (
        <div style={style}>
            <img
                src={`http://localhost:3123/gallery/image/portfolio/${image.fileName}`}
                alt={image.fileName}
            />
        </div>
    );
};

export default GalleryThumb;
