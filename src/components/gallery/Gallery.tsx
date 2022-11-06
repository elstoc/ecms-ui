import { useResizeDetector } from 'react-resize-detector';
import React, { ReactElement, useCallback, useState } from 'react';

import { useGalleryList } from '../../hooks/galleryQueries';
import GalleryThumb from './GalleryThumb';
import './Gallery.scss';
import { ImageData } from './IGallery';

const Gallery = (): ReactElement => {
    const galleryPath = 'portfolio';
    const margin = 3;
    const galleryImages: ImageData[] = [];
    let message = '';

    const [galleryDivWidth, setGalleryWidth] = useState<number>(0);

    const { isLoading, error, data: imageList } = useGalleryList(galleryPath);

    const onResize = useCallback((width?: number, height?: number) => {
        if (width) setGalleryWidth(width);
    },[setGalleryWidth]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (error) {
        message = 'There has been an ERROR';
    } else if (isLoading || !galleryDivWidth) {
        message = 'Loading Images';
    } else {
        //resize images to fit in rows
        let nextRowImgsWidth = 0;
        let nextRowImgs: ImageData[] = [];

        imageList!.forEach((image) => {
            nextRowImgs.push(image);
            nextRowImgsWidth += image.thumbDimensions.width;
            const availableImgsWidth = galleryDivWidth - (2 * margin * nextRowImgs.length);

            if (nextRowImgsWidth >= availableImgsWidth) {
                const ratio = availableImgsWidth / nextRowImgsWidth;
                nextRowImgs.forEach((image) => {
                    image.galleryDimensions = {
                        width: Math.trunc(image.thumbDimensions.width * ratio),
                        height: Math.trunc(image.thumbDimensions.height * ratio)
                    };
                    galleryImages.push(image);
                });
                nextRowImgs = [];
                nextRowImgsWidth = 0;
            }
        });

        // add any unhandled images
        nextRowImgs.forEach((image) => {
            image.galleryDimensions = image.thumbDimensions;
            galleryImages.push(image);
        });
    }

    return (
        <div className='content'>
            <div ref={widthRef} className="justifiedGallery">
                {message}
                {galleryImages.map((image) => 
                    <GalleryThumb
                        key={image.fileName}
                        image={image}
                        margin={margin}
                        path={galleryPath}
                    />
                )}
            </div>
        </div>
    );
};

export default Gallery;
