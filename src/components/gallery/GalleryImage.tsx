import React, { FC, ReactElement } from 'react';

type ImageProps = {
    url: string,
    alt: string
}

export const GalleryImage: FC<ImageProps> = ({ url, alt }): ReactElement => {
    return (
        <img
            src={url}
            alt={alt}
        />
    );
};
