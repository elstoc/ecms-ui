import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../api';

export const useUserInfo = () => {
    return useQuery({
        queryKey: ['user-info'],
        queryFn: () => getUserInfo(),
    });
};
