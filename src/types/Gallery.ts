export type Exif = {
    [key: string]: string | undefined;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type ImageData = {
    fileName: string;
    sourceModificationTime: number;
    exif: Exif;
    thumbDimensions: Dimensions;
}

export type GalleryData = {
    imageCount: number;
    imageList: ImageData[];
}
