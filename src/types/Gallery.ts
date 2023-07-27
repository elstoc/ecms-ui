export type Exif = {
    [key: string]: string | undefined;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type ImageData = {
    fileName: string;
    description: string;
    exif: Exif;
    thumbDimensions: Dimensions;
    thumbSrcUrl: string;
    fhdSrcUrl: string;
}

export type GalleryImages = {
    imageCount: number;
    images: ImageData[];
}
