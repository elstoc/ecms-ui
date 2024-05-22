import { axiosSecureClient } from '../api/axiosClients';

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

export const getGalleryContents = async (path: string, limit = 0): Promise<GalleryContents> => {
    const url = 'gallery/contents/';
    const { data } = await axiosSecureClient.get<GalleryContents>(url, { params: { path, limit }});
    return data;
};
