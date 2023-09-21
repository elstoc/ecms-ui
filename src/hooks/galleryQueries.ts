import { useQuery } from '@tanstack/react-query';

import { getGalleryImages } from '../api';

export const useGalleryList = (path: string, limit = 0) => {
    return useQuery({
        queryKey: ['galleryList', path, limit],
        queryFn: () => getGalleryImages(path, limit),
    });
};
