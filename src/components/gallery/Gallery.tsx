import { useResizeDetector } from 'react-resize-detector';
import React, { useCallback, useState } from 'react';

import './Gallery.scss';
import { ImageData } from './IGallery';

import { useQuery } from '@tanstack/react-query';

const Gallery = () => {
    const border = 0;
    const margin = 2;

    const { isLoading, error, data: imageList } = useQuery(['imageListPortfolio'], () =>
        fetch('http://localhost:3123/gallery/imagelist/portfolio').then(res =>
            res.json()
        )
    );

    const [galleryWidth, setGalleryWidth] = useState<number>(0);

    const onResize = useCallback((width?: number, height?: number) => {
        if (width) setGalleryWidth(width);
    },[setGalleryWidth]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (isLoading || !galleryWidth) {
        return (
            <div className='content'>
                <div ref={widthRef} className="justifiedGallery">
                    {'Loading images...'}
                </div>
            </div>
        );
    }

    if (error) return <div>Error...</div>;

    let rowImgWidth = 0;
    let row: ImageData[] = [];
    const galleryData: ImageData[] = [];

    (imageList as ImageData[]).forEach((image) => {
        row.push(image);
        rowImgWidth += image.thumbDimensions.width;
        const availableWidth = galleryWidth - (2 * (margin + border) * row.length);

        if (rowImgWidth >= availableWidth) {
            const ratio = availableWidth / rowImgWidth;
            row.forEach((image) => {
                image.galleryDimensions = {
                    width: Math.trunc(image.thumbDimensions.width * ratio),
                    height: Math.trunc(image.thumbDimensions.height * ratio)
                };
                galleryData.push(image);
            });
            row = [];
            rowImgWidth = 0;
        }
    });

    // add any unhandled images
    row.forEach((image) => {
        image.galleryDimensions = image.thumbDimensions;
        galleryData.push(image);
    });

    const elements: JSX.Element[] = [];

    (galleryData as ImageData[]).forEach((item) => {
        const style = {
            width: `${item.galleryDimensions!.width}px`,
            height: `${item.galleryDimensions!.height}px`,
            border: `${border}px solid black`,
            margin: `${margin}px`
        };
        elements.push(<div key={item.fileName} style={style}><img src={`http://localhost:3123/gallery/image/portfolio/${item.fileName}`} alt={item.fileName}/></div>);
    });

    return (
        <div className='content'>
            <div ref={widthRef} className="justifiedGallery">
                {elements}
            </div>
        </div>
    );
};

export default Gallery;
