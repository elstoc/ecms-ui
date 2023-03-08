import React, { MouseEvent, FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../../hooks/useKeyPress';
import { ImageData } from '../../types/Gallery';

import './LightBox.css';

type LightBoxProps = {
    parentTitle: string;
    currImage: ImageData;
    prevImage: ImageData | undefined;
    nextImage: ImageData | undefined;
}

export const LightBox: FC<LightBoxProps> = ({ parentTitle, currImage, prevImage, nextImage }): ReactElement => {
    const navigate = useNavigate();

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
    
    return (
        <div className='LightBox' onClick={handleOuterClick}>
            <Helmet><title>{parentTitle} - {currImage.fileName}</title></Helmet>
            <div className='close' onClick={goBack}>&times;</div>
            {prevImage && <div className='prev' onClick={goPrevImage}>&#10094;</div>}
            {nextImage && <div className='next' onClick={goNextImage}>&#10095;</div>}
            <img src={currImage.fhdSrcUrl} alt={currImage.fileName} />
            <div className='image-info'>{currImage.description}</div>

            <div className='preload'>
                {prevImage && <img src={prevImage.fhdSrcUrl} alt='preload' />}
                {nextImage && <img src={nextImage.fhdSrcUrl} alt='preload' />}
            </div>
        </div>
    );
};
