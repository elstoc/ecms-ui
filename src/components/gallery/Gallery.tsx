import { useResizeDetector } from 'react-resize-detector';
import React, { FC, ReactElement, useCallback, useState, createRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useIsVisible } from '../../hooks/useIsVisible';
import { useGalleryList } from '../../hooks/galleryQueries';
import GalleryThumb from './GalleryThumb';
import LightBox from './LightBox';
import './Gallery.css';

export type GalleryProps = {
    path: string;
    title: string;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

const Gallery: FC<GalleryProps> = ({ path, marginPx, title, batchSize, threshold }): ReactElement => {
    const resizeRatios: number[] = [];
    let message = '';

    const refImageToTriggerLoadWhenVisible = createRef<HTMLImageElement>();
    const [maxImagesToLoad, setMaxImagesToLoad] = useState(batchSize);
    const [galleryDivWidth, setGalleryDivWidth] = useState(0);

    const { isLoading, error, data: galleryData } = useGalleryList(path, maxImagesToLoad);

    const loadMoreImages = useCallback(() => {
        setMaxImagesToLoad((prevMaxImages) => (prevMaxImages < galleryData!.imageCount) ? (prevMaxImages + batchSize) : prevMaxImages);
    }, [galleryData, batchSize]);

    useIsVisible(refImageToTriggerLoadWhenVisible, loadMoreImages);

    const onResize = useCallback((width: number | undefined) => (
        width && setGalleryDivWidth(width)
    ), []);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (error) {
        message = 'There has been an ERROR';
    } else if (isLoading) {
        message = 'Loading Images';
    } else {
        //populate array of resize ratios to fit images in rows
        let nextRowWidthOfThumbs = 0;
        let nextRowImageCount = 0;

        galleryData?.imageList?.forEach((image) => {
            nextRowImageCount++;
            nextRowWidthOfThumbs += image.thumbDimensions.width;
            const widthAvailableForImages = galleryDivWidth - (2 * marginPx * nextRowImageCount);

            if (nextRowWidthOfThumbs >= widthAvailableForImages) {
                const ratio = widthAvailableForImages / nextRowWidthOfThumbs;
                resizeRatios.push(...Array(nextRowImageCount).fill(ratio));
                nextRowWidthOfThumbs = 0;
                nextRowImageCount = 0;
            }
        });

        // add any unhandled images
        resizeRatios.push(...Array(nextRowImageCount).fill(1));
    }

    return (
        <div className='galleryContainer'>
            <div ref={widthRef} className="justifiedGallery">
                {message}
                <Routes>
                    {galleryData && <Route path=":imageName" element={<LightBox path={path} galleryData={galleryData} loadMoreImages={loadMoreImages} />} />}
                </Routes>
                {galleryData?.imageList?.map((image, index) => 
                    <GalleryThumb
                        key={image.fileName}
                        image={image}
                        title={`${title} - ${image.fileName}`}
                        marginPx={marginPx}
                        resizeRatio={resizeRatios[index]}
                        path={path}
                        ref={index === (galleryData.imageList.length - threshold) ? refImageToTriggerLoadWhenVisible : null}
                    />
                )}
            </div>
        </div>
    );
};

export default Gallery;
