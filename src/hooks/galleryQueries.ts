import { useQuery } from '@tanstack/react-query';

import { getGalleryImages } from '../api';

export const useGalleryList = (path: string, limit = 0) => {
    const { isLoading, isError, error, data} = useQuery({
        queryKey: ['galleryList', path, limit],
        queryFn: () => getGalleryImages(path, limit),
    });

    return {
        queryState: {
            isLoading, isError, error
        },
        galleryContent: data
    };
};
