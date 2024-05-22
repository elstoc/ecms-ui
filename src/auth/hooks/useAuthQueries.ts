import { getUserInfo } from '../api';
import { useCustomQuery } from '../../hooks/useCustomQuery';

export const useUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};
