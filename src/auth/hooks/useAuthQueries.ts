import { getUserInfo } from '../api/auth';
import { useCustomQuery } from '../../hooks/useCustomQuery';

export const useUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};
