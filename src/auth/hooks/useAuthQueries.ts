import { getUserInfo } from '../api';
import { useCustomQuery } from '../../common/hooks';
import { useSiteConfig } from '../../site';

export const useUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};

export const useUserIsAdmin = () => {
    const user = useUserInfo();
    const { authEnabled } = useSiteConfig();
    return !authEnabled || (user.roles ?? []).includes('admin');
};
