export type Exif = {
    title: string | undefined;
    dateTaken: string | undefined;
    camera: string | undefined;
    lens: string | undefined;
    exposure: string | undefined;
    iso: string | undefined;
    aperture: string | undefined;
    focalLength: string | undefined;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type ImageData = {
    fileName: string;
    exif: Exif;
    thumbDimensions: Dimensions;
    galleryDimensions?: Dimensions;
}
