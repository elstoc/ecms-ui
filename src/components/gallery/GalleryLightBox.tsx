import React, { FC, ReactElement } from 'react';

import { useNavigate } from 'react-router-dom';
import { ImageMetadata } from '../../types/Gallery';
import { LightBox } from '../shared/lightbox';

type GLightBoxProps = {
    currImage?: ImageMetadata;
    prevImage?: ImageMetadata;
    nextImage?: ImageMetadata;
}

export const GalleryLightBox: FC<GLightBoxProps> = ({ currImage, prevImage, nextImage }): ReactElement => {
    const navigate = useNavigate();
    if (!currImage) {
        return <></>;
    }

    const goBack = () => navigate('.', { replace: true });
    const goPrevImage = () => navigate(`.?file=${prevImage?.fileName}`, { replace: true });
    const goNextImage = () => navigate(`.?file=${nextImage?.fileName}`, { replace: true });

    return (
        <LightBox
            onClose={goBack}
            onPrev={prevImage && goPrevImage}
            onNext={nextImage && goNextImage}
            caption={currImage.description}
            alt={currImage.fileName}
            imageUrl={currImage.fhdSrcUrl}
            prevImageUrl={prevImage?.fhdSrcUrl}
            nextImageUrl={nextImage?.fhdSrcUrl}
        />
    );
};
