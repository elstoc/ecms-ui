import React, { createRef, FC, ReactElement, startTransition, useCallback, useContext, useMemo } from 'react';

import { GalleryStateContext } from './Gallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';
import { useElementIsVisible } from '../../common/hooks/useElementIsVisible';
import { useScrollIntoView } from '../../common/hooks';

import { GalleryThumb } from './GalleryThumb';
import { Tesselate } from './Tesselate';

const MARGIN_PX = 3;

export const JustifiedGallery: FC = (): ReactElement => {
    const { galleryState: { apiPath, maxImages, activeImageIndex }, galleryStateReducer } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(apiPath, maxImages);

    const loadMoreImages = useCallback(() => (
        startTransition(() => {
            galleryStateReducer({ action: 'incrementMaxImages', maximum: allImageFiles.length });
        })
    ), [allImageFiles, galleryStateReducer]);

    const refLastImage = createRef<HTMLAnchorElement>();
    useElementIsVisible(refLastImage, loadMoreImages);

    const refActiveImage = createRef<HTMLAnchorElement>();
    useScrollIntoView(refActiveImage);

    const imageTiles = useMemo(() => images.map((image, index) => {
        let ref = index === activeImageIndex ? refActiveImage : null;
        if (index === images.length - 1) ref = refLastImage;

        const element = (
            <GalleryThumb
                key={image.fileName}
                fileName={image.fileName}
                description={image.description}
                url={image.thumbSrcUrl}
                ref={ref}
            />
        );

        return {
            element,
            key: image.fileName,
            maxHeight: image.thumbDimensions.height,
            maxWidth: image.thumbDimensions.width
        };
    }), [activeImageIndex, images, refActiveImage, refLastImage]);

    return <Tesselate tiles={imageTiles} marginPx={MARGIN_PX} />;
};
