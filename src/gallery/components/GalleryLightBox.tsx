import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LightBox } from '../../common/components/lightbox';
import { useGalleryContent } from '../hooks/useGalleryQueries';
import { GalleryStateContext } from './Gallery';
import { useTitle } from '../../common/hooks';

export const GalleryLightBox: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { galleryState: { apiPath, maxImages, title }, galleryStateReducer } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(apiPath, maxImages);

    const imageName = searchParams.get('image');
    const imageIndex = allImageFiles.findIndex((fileName) => fileName === imageName);

    if (images && imageName && imageIndex < 0) {
        // requested LightBox image does not exist
        setSearchParams({}, { replace: true });
    }

    useEffect(() => {
        if ( imageIndex >= images.length && images.length < allImageFiles.length) {
            // requested LightBox image is available but not currently loaded
            galleryStateReducer({ action: 'setMaxImages', value: imageIndex + 1 });
        }
        galleryStateReducer({ action: 'setActiveImageIndex', value: imageIndex });
    }, [images, allImageFiles, imageIndex, galleryStateReducer]);

    useTitle(`${title} - ${imageName}`);

    const currImage = images[imageIndex];
    const nextImage = images[imageIndex + 1];
    const prevImage = images[imageIndex - 1];

    return currImage && (
        <LightBox
            onClose={() => setSearchParams({}, { replace: true })}
            onPrev={prevImage && (() => setSearchParams({ image: prevImage.fileName }, { replace: true }))}
            onNext={nextImage && (() => setSearchParams({ image: nextImage.fileName }, { replace: true }))}
            caption={currImage.description}
            alt={currImage.fileName}
            imageUrl={currImage.fhdSrcUrl}
            prevImageUrl={prevImage?.fhdSrcUrl}
            nextImageUrl={nextImage?.fhdSrcUrl}
        />
    );
};
