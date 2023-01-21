import React, { MouseEvent, FC, ReactElement, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useKeyPress } from '../../hooks/useKeyPress';

import { GalleryData } from '../../types/Gallery';

import './LightBox.css';

type LightBoxProps = {
    path: string;
    galleryData: GalleryData;
    loadMoreImages: () => void;
}

export const LightBox: FC<LightBoxProps> = ({ path, galleryData, loadMoreImages }): ReactElement => {
    const { imageName } = useParams();
    const navigate = useNavigate();
    const galleryImages = galleryData.imageList;
    const currImageIndex = galleryImages.findIndex((image) => image.fileName === imageName);
    const prevImage = galleryImages[currImageIndex - 1];
    const nextImage = galleryImages[currImageIndex + 1];

    useEffect(() => {
        if (!nextImage && galleryData.imageCount > currImageIndex + 1) {
            loadMoreImages();
            console.log('boo');
        }
    },[nextImage, galleryData, currImageIndex, loadMoreImages]);

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

    useKeyPress(['Backspace', 'Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    const currImage = galleryImages[currImageIndex];

    return (
        <div className='LightBox' onClick={handleOuterClick}>
            <Link to=".." replace={true} className="close">&times;</Link>
            {prevImage && <Link className="prev" to={`../${prevImage.fileName}`} replace={true}><div>&#10094;</div></Link>}
            {nextImage && <Link className="next" to={`../${nextImage.fileName}`} replace={true}><div>&#10095;</div></Link>}
            <img src={currImage.fhdSrcUrl} alt={imageName} />
            <div className='preload'>
                {prevImage && <img src={prevImage.fhdSrcUrl} alt={imageName} />}
                {nextImage && <img src={nextImage.fhdSrcUrl} alt={imageName} />}
            </div>
            <div className="image-info">{currImage.description}</div>
        </div>
    );
};
