import { useQuery } from '@tanstack/react-query';

import { GalleryData } from '../types/Gallery';

const apiUrl = process.env.API_URL || '';

const galleryListQuery = async (path: string, limit = 0): Promise<GalleryData> => {
    const response = await fetch(`${apiUrl}/gallery/imagelist/${path}?limit=${limit}`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: GalleryData = await response.json();

    return returnData || {};
};

export const useGalleryList = (path: string, limit = 0) => {
    const queryName = `gallery/imagelist/${path}`;

    return useQuery({
        queryKey: [queryName, limit],
        keepPreviousData: true,
        queryFn: () => galleryListQuery(path, limit)
    });
};
