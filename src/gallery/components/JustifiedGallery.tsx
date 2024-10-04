import React, { createRef, FC, ReactElement, startTransition, useCallback, useContext, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { GalleryThumb } from './GalleryThumb';
import { GalleryStateContext } from './Gallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

import './JustifiedGallery.scss';
import { useElementIsVisible } from '../../common/hooks/useElementIsVisible';
import { useScrollIntoView } from '../../common/hooks';

const MARGIN_PX = 3; // Also needs to be set in GalleryThumb.scss

export const JustifiedGallery: FC = (): ReactElement => {
    const { galleryState: { apiPath, maxImages, activeImageIndex }, galleryStateReducer } = useContext(GalleryStateContext);
    const { images, allImageFiles } = useGalleryContent(apiPath, maxImages);
    const { width: galleryDivWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });

    const loadMoreImages = useCallback(() => (
        startTransition(() => {
            galleryStateReducer({ action: 'incrementMaxImages', maximum: allImageFiles.length });
        })
    ), [allImageFiles, galleryStateReducer]);

    const refLastImage = createRef<HTMLAnchorElement>();
    useElementIsVisible(refLastImage, loadMoreImages);

    const refActiveImage = createRef<HTMLAnchorElement>();
    useScrollIntoView(refActiveImage);

    const resizeRatios = useMemo(() => {
        const thumbWidths = images.map((image) => image.thumbDimensions.width);
        return getResizeRatios(thumbWidths, galleryDivWidth ?? 0);
    }, [images, galleryDivWidth]);

    return (
        <div ref={widthRef} className="justified-gallery">
            {images.map((image, index) => {
                let ref = index === activeImageIndex ? refActiveImage : null;
                if (index === images.length - 1) ref = refLastImage;
                return (
                    <GalleryThumb
                        key={image.fileName}
                        fileName={image.fileName}
                        description={image.description}
                        url={image.thumbSrcUrl}
                        ref={ref}
                        heightPx={image.thumbDimensions.height * resizeRatios[index]}
                    />
                );
            })}
        </div>
    );
};

const getResizeRatios = (thumbWidths: number[], divWidth: number): number[] => {
    let nextRowWidthOfThumbs = 0,
        nextRowImageCount = 0;
    const resizeRatios: number[] = [];

    thumbWidths.forEach((thumbWidth) => {
        nextRowImageCount++;
        nextRowWidthOfThumbs += thumbWidth;
        const widthAvailableForThumbs = divWidth - (2 * MARGIN_PX * nextRowImageCount);

        if (nextRowWidthOfThumbs >= widthAvailableForThumbs) {
            const resizeRatio = widthAvailableForThumbs / nextRowWidthOfThumbs;
            resizeRatios.push(...Array(nextRowImageCount).fill(resizeRatio));
            nextRowWidthOfThumbs = nextRowImageCount = 0;
        }
    });

    if (thumbWidths.length > resizeRatios.length) {
        resizeRatios.push(...Array(nextRowImageCount).fill(1));
    }

    return resizeRatios;
};
