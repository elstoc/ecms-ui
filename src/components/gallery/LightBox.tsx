import React, { FC, ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImageData } from './IGallery';

import './LightBox.css';

const apiUrl: string = process.env.API_URL || '';

type LightBoxProps = {
    path: string;
    galleryImages: ImageData[];
}

const LightBox: FC<LightBoxProps> = ({ path, galleryImages }): ReactElement => {
    const { imageName } = useParams();
    const currImageIndex = galleryImages.findIndex((image) => image.fileName === imageName);
    const prevImage = galleryImages[currImageIndex - 1];
    const nextImage = galleryImages[currImageIndex + 1];
    return (
        <div className='LightBox'>
            {prevImage && <Link to={`../${prevImage.fileName}`} replace={true} className="prev">&#10094;</Link>}
            {nextImage && <Link to={`../${nextImage.fileName}`} replace={true} className="next">&#10095;</Link>}
            <img src={`${apiUrl}/gallery/image/${path}/${imageName}?size=full`} alt={imageName} />
        </div>
    );
};

export default LightBox;
