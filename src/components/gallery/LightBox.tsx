import React, { MouseEvent, FC, ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../../hooks/useKeyPress';
import { ImageMetadata } from '../../types/Gallery';

import './LightBox.scss';
import { Icon } from '../utils/Icon';

type LightBoxProps = {
    parentTitle: string;
    currImage: ImageMetadata;
    prevImage: ImageMetadata | undefined;
    nextImage: ImageMetadata | undefined;
}

export const LightBox: FC<LightBoxProps> = ({ parentTitle, currImage, prevImage, nextImage }): ReactElement => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('..', { replace: true });
    };

    const handleOuterClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            goBack();
        }
    };

    const restartFadeOut = () => {
        const elements = document.querySelectorAll<HTMLElement>('.fadeout');
        elements.forEach((element) => {
            element.classList.remove('fadeout');
            setTimeout(() => { element.classList.add('fadeout'); }, 10);
        });
    };

    const goPrevImage = () => {
        prevImage && navigate(`../${prevImage.fileName}`, { replace: true });
    };

    const goNextImage = () => {
        nextImage && navigate(`../${nextImage.fileName}`, { replace: true });
    };

    useEffect(() => {
        restartFadeOut();
    });

    useKeyPress(['Backspace', 'Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    return (
        <div className='lightbox' onClick={handleOuterClick} onMouseMove={restartFadeOut}>
            <Helmet><title>{parentTitle} - {currImage.fileName}</title></Helmet>
            <div className='close fadeout' onClick={goBack}>
                <Icon name='close' />
            </div>
            {prevImage &&
                <div className='prev fadeout' onClick={goPrevImage}>
                    <Icon name='previous' />
                </div>
            }
            {nextImage &&
                <div className='next fadeout' onClick={goNextImage}>
                    <Icon name='next' />
                </div>
            }
            <img src={currImage.fhdSrcUrl} alt={currImage.fileName} />
            <div className='image-info fadeout'>{currImage.description}</div>

            <div className='preload'>
                {prevImage && <img src={prevImage.fhdSrcUrl} alt='preload' />}
                {nextImage && <img src={nextImage.fhdSrcUrl} alt='preload' />}
            </div>
        </div>
    );
};
