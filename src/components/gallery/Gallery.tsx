import { useResizeDetector } from 'react-resize-detector';
import React, { useCallback, useState } from 'react';

import './Gallery.scss';
import { ImageData, SizeData } from './IGallery';

import jsonData from './initialData.json';

const Gallery = () => {
    const border = 1;
    const margin = 5;
    const images = jsonData as ImageData[];
    const [sizedImages, setSizedImages] = useState<SizeData>();

    const onResize = useCallback((width?: number, height?: number) => {
        if (!width) return;

        let rowWidth = 0;
        let row: ImageData[] = [];
        const newSizedImages: SizeData = {};

        images.forEach((image) => {
            row.push(image);
            if (image?.thumbDimensions?.width && image?.thumbDimensions?.height && image?.fileName) {
                rowWidth += image.thumbDimensions.width;
                const desiredWidth = width - 2 * (margin + border) * row.length;

                if (rowWidth > desiredWidth) {
                    const ratio = desiredWidth / rowWidth;
                    row.forEach((image) => {
                        newSizedImages[image.fileName] = {
                            width: Math.trunc(image.thumbDimensions.width * ratio),
                            height: Math.trunc(image.thumbDimensions.height * ratio)
                        };
                    });
                    row = [];
                    rowWidth = 0;
                }

                if (rowWidth === desiredWidth) {
                    row.forEach((image) => {
                        newSizedImages[image.fileName] = image.thumbDimensions;
                    });
                    row = [];
                    rowWidth = 0;
                }
            }

        });

        row.forEach((image) => {
            newSizedImages[image.fileName] = image.thumbDimensions;
        });
        setSizedImages(newSizedImages);

    }, [images]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    const elements: JSX.Element[] = [];

    sizedImages && images.forEach((item) => {
        const style = {
            width: `${sizedImages[item.fileName].width}px`,
            height: `${sizedImages[item.fileName].height}px`,
            border: `${border}px solid black`,
            margin: `${margin}px`
        };
        elements.push(<div key={item.fileName} style={style}>Image</div>);
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
