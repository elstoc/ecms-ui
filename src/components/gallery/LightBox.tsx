import React, { FC, ReactElement } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useKeyPress from '../../hooks/useKeyPress';

import { ImageData } from './IGallery';

import './LightBox.css';

const apiUrl: string = process.env.API_URL || '';

type LightBoxProps = {
    path: string;
    galleryImages: ImageData[];
}

const LightBox: FC<LightBoxProps> = ({ path, galleryImages }): ReactElement => {
    const { imageName } = useParams();
    const navigate = useNavigate();
    const currImageIndex = galleryImages.findIndex((image) => image.fileName === imageName);
    const prevImage = galleryImages[currImageIndex - 1];
    const nextImage = galleryImages[currImageIndex + 1];

    const goBack = () => {
        navigate('..');
    };

    const goPrevImage = () => {
        navigate(`../${prevImage.fileName}`, { replace: true });
    };

    const goNextImage = () => {
        navigate(`../${nextImage.fileName}`, { replace: true });
    };

    useKeyPress(['Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    
    return (
        <div className='LightBox'>
            {prevImage && <Link to={`../${prevImage.fileName}`} replace={true} className="prev">&#10094;</Link>}
            {nextImage && <Link to={`../${nextImage.fileName}`} replace={true} className="next">&#10095;</Link>}
            <img src={`${apiUrl}/gallery/image/${path}/${imageName}?size=full`} alt={imageName} />
        </div>
    );
};

export default LightBox;
