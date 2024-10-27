import { getUserInfo } from '../api';
import { useCustomQuery } from '../../shared/hooks';
import { useSiteConfig } from '../../site';

export const useGetUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};

export const useGetUserIsAdmin = () => {
    const user = useGetUserInfo();
    const { authEnabled } = useSiteConfig();
    return !authEnabled || (user.roles ?? []).includes('admin');
};
