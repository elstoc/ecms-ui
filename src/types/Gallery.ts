export type Exif = {
    [key: string]: string | undefined;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type ImageMetadata = {
    fileName: string;
    description: string;
    exif: Exif;
    thumbDimensions: Dimensions;
    thumbSrcUrl: string;
    fhdSrcUrl: string;
}

export type GalleryContents = {
    images: ImageMetadata[];
    allImageFiles: string[];
}
