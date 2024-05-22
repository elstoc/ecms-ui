import { useCustomQuery } from '../../common/hooks/useCustomQuery';
import { getGalleryContents } from '../api';

export const useGalleryContent = (path: string, limit = 0) => {
    return useCustomQuery({
        queryKey: ['galleryContents', path, limit],
        queryFn: () => getGalleryContents(path, limit),
    });
};
