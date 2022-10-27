import './Gallery.scss';
import { useResizeDetector } from 'react-resize-detector';
import React, { useCallback, useState } from 'react';
import jsonData from './initialData.json';

type Image = {
    path: string;
    width: number;
    height: number;
};

const Gallery = () => {
    const border = 1;
    const margin = 5;
    const images = jsonData as Image[];
    const [sizedImages, setSizedImages] = useState<Image[]>();

    const onResize = useCallback((width?: number, height?: number) => {
        if (!width) return;

        let rowWidth = 0;
        let row: Image[] = [];
        const newSizedImages: Image[] = [];

        images.forEach((image) => {
            row.push(image);
            rowWidth += image.width;
            const desiredWidth = width - 2 * (margin + border) * row.length;

            if (rowWidth > desiredWidth) {
                const ratio = desiredWidth / rowWidth;
                row = row.map((image) => {
                    return {
                        path: image.path,
                        width: Math.trunc(image.width * ratio),
                        height: Math.trunc(image.height * ratio)
                    };
                });
            }

            if(rowWidth >= desiredWidth) {
                newSizedImages.push(...row);
                row = [];
                rowWidth = 0;
            }

        });

        newSizedImages.push(...row);
        setSizedImages(newSizedImages);

    }, [images]);

    const { ref: widthRef } = useResizeDetector({
        handleHeight: false,
        onResize
    });

    const elements: JSX.Element[] = [];

    sizedImages && sizedImages.forEach((item) => {
        const style = {
            width: `${item.width}px`,
            height: `${item.height}px`,
            border: `${border}px solid black`,
            margin: `${margin}px`
        };
        elements.push(<div key={item.path} style={style}>Image</div>);
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
