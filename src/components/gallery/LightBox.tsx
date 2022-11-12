import React, { MouseEvent, FC, ReactElement } from 'react';
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
        navigate('..', { replace: true });
    };

    const goPrevImage = () => {
        prevImage && navigate(`../${prevImage.fileName}`, { replace: true });
    };

    const goNextImage = () => {
        nextImage && navigate(`../${nextImage.fileName}`, { replace: true });
    };

    const handleOuterClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            goBack();
        }
    };

    useKeyPress(['Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    const currImage = galleryImages[currImageIndex];
    let imageDesc = currImage.exif.title || '';

    if (currImage.exif.dateTaken) {
        const exifDate = new Date(currImage.exif.dateTaken);
        imageDesc += ` (${exifDate.toLocaleDateString('default', { month: 'short' })} ${exifDate.getFullYear()})`;
    }

    return (
        <div className='LightBox' onClick={handleOuterClick}>
            <Link to=".." replace={true} className="close">&times;</Link>
            {prevImage && <Link className="prev" to={`../${prevImage.fileName}`} replace={true}><div>&#10094;</div></Link>}
            {nextImage && <Link className="next" to={`../${nextImage.fileName}`} replace={true}><div>&#10095;</div></Link>}
            <img src={`${apiUrl}/gallery/image/${path}/${imageName}?size=full`} alt={imageName} />
            <div className="image-info">{imageDesc}</div>
        </div>
    );
};

export default LightBox;
