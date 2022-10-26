import './galleryPage.css';
import { useResizeDetector } from 'react-resize-detector';
import React, { useCallback, useEffect, useState } from 'react';
import jsonData from './initialData.json';

type Image = {
    path: string;
    width: number;
    height: number;
};

const GalleryPage = () => {
    const { width, height, ref } = useResizeDetector({
        handleHeight: false,
        refreshMode: 'debounce',
        refreshRate: 200
    });
    const border = 1;
    const margin = 5;
    const images = jsonData as Image[];
    const [sizedImages, setSizedImages] = useState<Image[]>();

    console.log(`width: ${width} height: ${height}`);

    const redraw = useCallback((): void => {
        let rowWidth = 0;
        let rowImages: Image[] = [];
        const newSizedImages: Image[] = [];

        images.forEach((image) => {
            rowImages.push(image);
            rowWidth += image.width;
            const desiredWidth = width! - 2 * (margin + border) * rowImages.length;
            if(rowWidth === desiredWidth) {
                newSizedImages.push(...rowImages);
                rowImages = [];
                rowWidth = 0;
                console.log('desired');
            } else if (rowWidth > desiredWidth) {
                const ratio = desiredWidth / rowWidth;
                rowImages = rowImages.map((image) => {
                    return {
                        path: image.path,
                        width: Math.trunc(image.width * ratio),
                        height: Math.trunc(image.height * ratio)
                    };
                });
                newSizedImages.push(...rowImages);
                rowImages = [];
                rowWidth = 0;
            }
        });

        newSizedImages.push(...rowImages);
        setSizedImages(newSizedImages);
    }, [width, images]);

    useEffect(() => {
        width && redraw();
    },[redraw]);

    const elements: JSX.Element[] = [];

    sizedImages && sizedImages.forEach((item) => {
        const style = {
            width: `${item.width}px`,
            height: `${item.height}px`,
            border: `${border}px solid black`,
            margin: `${margin}px`
        };
        elements.push(<div key={item.path} style={style}>Helloo World</div>);
    });

    return (
        <div className='main'>
            <div ref={ref} className="outerDiv">
                {sizedImages ? elements : 'This item has not been rendered yet'}
            </div>
        </div>
    );
};

export default GalleryPage;
