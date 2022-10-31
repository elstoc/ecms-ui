import { useResizeDetector } from 'react-resize-detector';
import React, { useCallback, useState } from 'react';

import './Gallery.scss';
import { ImageData, SizeData } from './IGallery';

import { useQuery } from '@tanstack/react-query';

const Gallery = () => {

    const { isLoading, error, data: imageList } = useQuery(['imageListPortfolio'], () =>
        fetch('http://localhost:3123/gallery/imagelist/portfolio').then(res =>
            res.json()
        )
    );

    const border = 0;
    const margin = 2;
    const [sizedImages, setSizedImages] = useState<SizeData>();

    const onResize = useCallback((width?: number, height?: number) => {
        if (!width) return;

        let rowWidth = 0;
        let row: ImageData[] = [];
        const newSizedImages: SizeData = {};

        (imageList as ImageData[]).forEach((image) => {
            row.push(image);
            if (image?.thumbDimensions?.width && image?.thumbDimensions?.height && image?.fileName) {
                // get width of all images
                // and width of div, less borders / margins (width available)
                rowWidth += image.thumbDimensions.width;
                const availableWidth = width - ( 2 * (margin + border) * row.length );

                if (rowWidth > availableWidth) {
                    // images exceed available width: decrease their size
                    const ratio = availableWidth / rowWidth;
                    row.forEach((image) => {
                        newSizedImages[image.fileName] = {
                            width: Math.trunc(image.thumbDimensions.width * ratio),
                            height: Math.trunc(image.thumbDimensions.height * ratio)
                        };
                    });
                    row = [];
                    rowWidth = 0;
                }

                if (rowWidth === availableWidth) {
                    // all images fit without adjusting size (corner case)
                    row.forEach((image) => {
                        newSizedImages[image.fileName] = image.thumbDimensions;
                    });
                    row = [];
                    rowWidth = 0;
                }
            }

        });

        // add any unhandled images
        row.forEach((image) => {
            newSizedImages[image.fileName] = image.thumbDimensions;
        });

        setSizedImages(newSizedImages);

    }, [imageList]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const elements: JSX.Element[] = [];

    sizedImages && (imageList as ImageData[]).forEach((item) => {
        const style = {
            width: `${sizedImages[item.fileName].width}px`,
            height: `${sizedImages[item.fileName].height}px`,
            border: `${border}px solid black`,
            margin: `${margin}px`
        };
        elements.push(<div key={item.fileName} style={style}><img src={`http://localhost:3123/gallery/image/portfolio/${item.fileName}`} alt={item.fileName}/></div>);
    });

    return (
        <div className='content'>
            <div ref={widthRef} className="justifiedGallery">
                {sizedImages ? elements : 'Loading images...'}
            </div>
        </div>
    );
};

export default Gallery;
