import './Gallery.scss';
import { useResizeDetector } from 'react-resize-detector';
import React, { useEffect, useState } from 'react';
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

    const { width, height, ref } = useResizeDetector({ handleHeight: false });
    const [sizedImages, setSizedImages] = useState<Image[]>();

    useEffect(() => {
        if (!width) return;

        let rowWidth = 0;
        let rowImages: Image[] = [];
        const newSizedImages: Image[] = [];

        images.forEach((image) => {
            rowImages.push(image);
            rowWidth += image.width;
            const desiredWidth = width! - 2 * (margin + border) * rowImages.length;

            if (rowWidth > desiredWidth) {
                const ratio = desiredWidth / rowWidth;
                rowImages = rowImages.map((image) => {
                    return {
                        path: image.path,
                        width: Math.trunc(image.width * ratio),
                        height: Math.trunc(image.height * ratio)
                    };
                });
            }

            if(rowWidth >= desiredWidth) {
                newSizedImages.push(...rowImages);
                rowImages = [];
                rowWidth = 0;
            }

        });

        newSizedImages.push(...rowImages);
        setSizedImages(newSizedImages);
    },[width, images]);

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
            <div ref={ref} className="justifiedGallery">
                {sizedImages ? elements : 'Loading images...'}
            </div>
        </div>
    );
};

export default Gallery;
