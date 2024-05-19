import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LightBox } from '../shared/lightbox';
import { useGalleryContent } from '../../hooks/useApiQueries';
import { GalleryStateContext } from './Gallery';

export const GalleryLightBox: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { galleryState, alterGalleryState } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(galleryState.apiPath, galleryState.maxImages);

    const lightBoxImageName = searchParams.get('file');
    const lightBoxImageIndex = allImageFiles?.findIndex((fileName) => fileName === lightBoxImageName) ?? -1;

    useEffect(() => {
        if ( lightBoxImageIndex > (images.length - 1) && images.length < allImageFiles.length) {
            alterGalleryState?.({ action: 'setMaxImages', value: lightBoxImageIndex + 1 });
        }
    }, [images, allImageFiles, lightBoxImageIndex, alterGalleryState]);

    const currImage = images[lightBoxImageIndex];
    const nextImage = images[lightBoxImageIndex + 1];
    const prevImage = images[lightBoxImageIndex - 1];

    if (images && lightBoxImageName && lightBoxImageIndex < 0) {
        // Handle invalid lightBox image
        setSearchParams({}, { replace: true });
    }

    if (!currImage) {
        return <></>;
    }

    return (
        <LightBox
            onClose={() => setSearchParams({}, { replace: true })}
            onPrev={prevImage && (() => setSearchParams({ file: prevImage?.fileName }, { replace: true }))}
            onNext={nextImage && (() => setSearchParams({ file: nextImage?.fileName }, { replace: true }))}
            caption={currImage.description}
            alt={currImage.fileName}
            imageUrl={currImage.fhdSrcUrl}
            prevImageUrl={prevImage?.fhdSrcUrl}
            nextImageUrl={nextImage?.fhdSrcUrl}
        />
    );
};
