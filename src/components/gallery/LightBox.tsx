import React, { MouseEvent, FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../../hooks/useKeyPress';

import { GalleryData } from '../../types/Gallery';

import './LightBox.css';

type LightBoxProps = {
    imageName: string;
    galleryData: GalleryData;
}

export const LightBox: FC<LightBoxProps> = ({ imageName, galleryData }): ReactElement => {
    const navigate = useNavigate();
    const galleryImages = galleryData.imageList;
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

    useKeyPress(['Backspace', 'Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    const currImage = galleryImages[currImageIndex];

    return (
        <div className='LightBox' onClick={handleOuterClick}>
            <div className='close' onClick={goBack}>&times;</div>
            {prevImage && <div className='prev' onClick={goPrevImage}>&#10094;</div>}
            {nextImage && <div className='next' onClick={goNextImage}>&#10095;</div>}
            <img src={currImage.fhdSrcUrl} alt={imageName} />
            <div className='image-info'>{currImage.description}</div>

            <div className='preload'>
                {prevImage && <img src={prevImage.fhdSrcUrl} alt='preload' />}
                {nextImage && <img src={nextImage.fhdSrcUrl} alt='preload' />}
            </div>
        </div>
    );
};
