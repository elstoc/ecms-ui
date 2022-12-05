import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState, createRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useIsVisible } from '../../hooks/useIsVisible';
import { useGalleryList } from '../../hooks/galleryQueries';
import GalleryThumb from './GalleryThumb';
import LightBox from './LightBox';
import './Gallery.scss';
import { ImageData } from '../../types/Gallery';

export type GalleryProps = {
    path: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

const Gallery: FC<GalleryProps> = ({ path, marginPx, title, batchSize, threshold }): ReactElement => {
    const galleryImages: ImageData[] = [];
    let message = '';

    const visibleRef = createRef<HTMLImageElement>();
    const [imageLimit, setImageLimit] = useState(batchSize);
    const [galleryDivWidth, setGalleryWidth] = useState(0);

    const { isLoading, error, data: galleryData } = useGalleryList(path, imageLimit);

    const loadMoreImages = useCallback(() => {
        setImageLimit((prev) => prev < galleryData!.imageCount ? prev + batchSize : prev);
    }, [galleryData, batchSize]);

    useIsVisible(visibleRef, loadMoreImages);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize: (width) => width && setGalleryWidth(width)
    });

    if (error) {
        message = 'There has been an ERROR';
    } else if (isLoading || !galleryDivWidth) {
        message = 'Loading Images';
    } else {
        //resize images to fit in rows
        let nextRowImgsWidth = 0;
        let nextRowImgs: ImageData[] = [];

        galleryData?.imageList?.forEach((image) => {
            nextRowImgs.push(image);
            nextRowImgsWidth += image.thumbDimensions.width;
            const availableImgsWidth = galleryDivWidth - (2 * marginPx * nextRowImgs.length);

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
                    {galleryData && <Route path=":imageName" element={<LightBox path={path} galleryData={galleryData} loadMoreImages={loadMoreImages} />} />}
                </Routes>
                {galleryImages.map((image, index) => 
                    <GalleryThumb
                        key={image.fileName}
                        image={image}
                        title={`${title} - ${image.fileName}`}
                        marginPx={marginPx}
                        path={path}
                        ref={index === galleryImages.length - threshold ? visibleRef : null}
                    />
                )}
            </div>
        </div>
    );
};

export default Gallery;
