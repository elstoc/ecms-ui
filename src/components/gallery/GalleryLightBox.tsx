import React, { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';
import { ImageMetadata } from '../../types/Gallery';
import { LightBox } from '../shared';

type GLightBoxProps = {
    parentTitle: string;
    currImage: ImageMetadata;
    prevImage: ImageMetadata | undefined;
    nextImage: ImageMetadata | undefined;
}

export const GalleryLightBox: FC<GLightBoxProps> = ({ parentTitle, currImage, prevImage, nextImage }): ReactElement => {
    const navigate = useNavigate();

    const goBack = () => navigate('..', { replace: true });
    const goPrevImage = () => navigate(`../${prevImage?.fileName}`, { replace: true });
    const goNextImage = () => navigate(`../${nextImage?.fileName}`, { replace: true });

    return (
        <>
            <Helmet><title>{parentTitle} - {currImage.fileName}</title></Helmet>
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
        </>
    );
};
