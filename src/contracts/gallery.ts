export enum ImageSize {
    thumb = 'thumb',
    fhd = 'fhd',
    forExif = 'forExif'
}

export type Dimensions = {
    width: number;
    height: number;
};

export type ImageMetadata = {
    fileName: string;
    description: string;
    exif: { [key: string]: string | undefined; };
    thumbDimensions: Dimensions;
    thumbSrcUrl: string;
    fhdSrcUrl: string;
};

export type GalleryContents = {
    images: ImageMetadata[];
    allImageFiles: string[];
};
