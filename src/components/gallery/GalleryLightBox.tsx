import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LightBox } from '../shared/lightbox';
import { useGalleryContent } from '../../hooks/useApiQueries';
import { GalleryStateContext } from './Gallery';

export const GalleryLightBox: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { galleryState, alterGalleryState } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(galleryState.apiPath, galleryState.maxImages);

    const lightBoxImageName = searchParams.get('image');
    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    if (images && lightBoxImageName && lightBoxImageIndex < 0) {
        // requested LightBox image does not exist
        setSearchParams({}, { replace: true });
    }

    useEffect(() => {
        if ( lightBoxImageIndex >= images.length && images.length < allImageFiles.length) {
            // requested LightBox image is available but not currently loaded
            alterGalleryState({ action: 'setMaxImages', value: lightBoxImageIndex + 1 });
        }
        alterGalleryState({ action: 'setLightBoxImage', value: lightBoxImageIndex });
    }, [images, allImageFiles, lightBoxImageIndex, alterGalleryState]);

    const currImage = images[lightBoxImageIndex];
    const nextImage = images[lightBoxImageIndex + 1];
    const prevImage = images[lightBoxImageIndex - 1];

    return currImage && (
        <LightBox
            onClose={() => setSearchParams({}, { replace: true })}
            onPrev={prevImage && (() => setSearchParams({ image: prevImage?.fileName }, { replace: true }))}
            onNext={nextImage && (() => setSearchParams({ image: nextImage?.fileName }, { replace: true }))}
            caption={currImage.description}
            alt={currImage.fileName}
            imageUrl={currImage.fhdSrcUrl}
            prevImageUrl={prevImage?.fhdSrcUrl}
            nextImageUrl={nextImage?.fhdSrcUrl}
        />
    );
};
