import { useResizeDetector } from 'react-resize-detector';
import React, { ReactElement, useCallback, useState } from 'react';

import { useGalleryPortfolio } from '../../hooks/galleryPortfolio';
import GalleryThumb from './GalleryThumb';
import './Gallery.scss';
import { ImageData } from './IGallery';

const Gallery = (): ReactElement => {
    const margin = 2;
    const galleryData: ImageData[] = [];
    let message = '';

    const [galleryWidth, setGalleryWidth] = useState<number>(0);

    const { isLoading, error, data: imageList } = useGalleryPortfolio();

    const onResize = useCallback((width?: number, height?: number) => {
        if (width) setGalleryWidth(width);
    },[setGalleryWidth]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (error) {
        message = 'There has been an ERROR';
    } else if (isLoading || !galleryWidth) {
        message = 'Loading Images';
    } else {
        //resize images to fit in rows
        let nextRowImgWidth = 0;
        let nextRow: ImageData[] = [];

        imageList!.forEach((image) => {
            nextRow.push(image);
            nextRowImgWidth += image.thumbDimensions.width;
            const availableWidth = galleryWidth - (2 * margin * nextRow.length);

            if (nextRowImgWidth >= availableWidth) {
                const ratio = availableWidth / nextRowImgWidth;
                nextRow.forEach((image) => {
                    image.galleryDimensions = {
                        width: Math.trunc(image.thumbDimensions.width * ratio),
                        height: Math.trunc(image.thumbDimensions.height * ratio)
                    };
                    galleryData.push(image);
                });
                nextRow = [];
                nextRowImgWidth = 0;
            }
        });

        // add any unhandled images
        nextRow.forEach((image) => {
            image.galleryDimensions = image.thumbDimensions;
            galleryData.push(image);
        });
    }

    return (
        <div className='content'>
            <div ref={widthRef} className="justifiedGallery">
                {message}
                {galleryData.map((image) => 
                    <GalleryThumb key={image.fileName} image={image} margin={margin} />
                )}
            </div>
        </div>
    );
};

export default Gallery;
