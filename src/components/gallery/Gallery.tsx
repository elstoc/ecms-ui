import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useGalleryList } from '../../hooks/galleryQueries';
import GalleryThumb from './GalleryThumb';
import LightBox from './LightBox';
import './Gallery.scss';
import { ImageData } from './IGallery';

export type GalleryProps = {
    path: string;
    margin: number;
}

const Gallery: FC<GalleryProps> = ({ path, margin }): ReactElement => {
    const galleryImages: ImageData[] = [];
    let message = '';

    const [galleryDivWidth, setGalleryWidth] = useState(0);

    const { isLoading, error, data: imageList } = useGalleryList(path);

    const onResize = useCallback((width?: number) => {
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
                <Routes>
                    <Route path=":imageName" element={<LightBox path={path} galleryImages={galleryImages} />} />
                </Routes>
                {galleryImages.map((image) => 
                    <GalleryThumb
                        key={image.fileName}
                        image={image}
                        margin={margin}
                        path={path}
                    />
                )}
            </div>
        </div>
    );
};

export default Gallery;
