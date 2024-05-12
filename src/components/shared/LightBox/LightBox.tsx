import React, { MouseEvent, FC, ReactElement, useEffect } from 'react';

import { useKeyPress } from '../../../hooks/useKeyPress';
import { Icon } from '..';

import './LightBox.scss';

type LightBoxProps = {
    onClose?: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    caption?: string;
    imageUrl: string;
    alt?: string;
    prevImageUrl?: string;
    nextImageUrl?: string;
}

export const LightBox: FC<LightBoxProps> = ({ onClose, onPrev, onNext, caption, alt, imageUrl, prevImageUrl, nextImageUrl }): ReactElement => {
    const handleOuterClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
    };

    const restartFadeOut = () => {
        const elements = document.querySelectorAll<HTMLElement>('.fadeout');
        elements.forEach((element) => {
            element.classList.remove('fadeout');
            setTimeout(() => { element.classList.add('fadeout'); }, 10);
        });
    };

    useEffect(() => {
        restartFadeOut();
    });

    useKeyPress(['Backspace', 'Escape'], () => onClose?.());
    useKeyPress(['ArrowLeft'], () => onPrev?.());
    useKeyPress(['ArrowRight'], () => onNext?.());
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    return (
        <div className='lightbox' onClick={handleOuterClick} onMouseMove={restartFadeOut}>
            <img src={imageUrl} alt={alt} />
            <div className='close fadeout' onClick={() => onClose?.()}>
                <Icon name='close' />
            </div>
            <div className='preload'>
                {prevImageUrl && <img src={prevImageUrl} alt='preload' />}
                {nextImageUrl && <img src={nextImageUrl} alt='preload' />}
            </div>

            {onPrev &&
                <div className='prev fadeout' onClick={() => onPrev()}>
                    <Icon name='previous' />
                </div>
            }
            {onNext &&
                <div className='next fadeout' onClick={() => onNext()}>
                    <Icon name='next' />
                </div>
            }
            {caption &&
                <div className='image-info fadeout'>
                    {caption}
                </div>
            }
        </div>
    );
};
