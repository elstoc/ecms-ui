import { axiosClient, axiosSecureClient } from '../common/api';
import { getStorage, setStorage } from '../utils';

const TOKEN_KEY = 'access-token';
const TOKEN_EXPIRY_KEY = 'access-token-expiry';

type User = {
    id: string;
    fullName?: string;
    roles?: string[];
    hashedPassword?: string;
};

type IdAndAccessToken = {
    id: string,
    accessToken: string,
    accessTokenExpiry: number;
};

const getAccessToken = (): { accessToken: string, accessTokenExpiry: number } => {
    const accessToken = getStorage(TOKEN_KEY);
    const accessTokenExpiry = parseInt(getStorage(TOKEN_EXPIRY_KEY) || '0');
    return { accessToken, accessTokenExpiry };
};

const setAccessToken = (token: string, expiry: number): void => {
    setStorage(TOKEN_KEY, token);
    setStorage(TOKEN_EXPIRY_KEY, expiry.toString());
};

const login = async (userId: string, password: string): Promise<void> => {
    const response = await axiosClient.post<IdAndAccessToken>('auth/login', { id: userId, password });
    const { accessToken, accessTokenExpiry } = response.data;
    setAccessToken(accessToken, accessTokenExpiry);
    console.log('logged in');
};

const logout = async (): Promise<void> => {
    await axiosClient.post('auth/logout');
    setAccessToken('', 0);
    console.log('logged out');
};

const refreshAccessToken = async (): Promise<void> => {
    try {
        const loggedUserInfo = (await axiosClient.post('auth/refresh')).data;
        const { accessToken, accessTokenExpiry } = loggedUserInfo;
        setAccessToken(accessToken, accessTokenExpiry);
        console.log('access token refreshed');
    } catch (e) {
        console.log('Error', e);   
        setAccessToken('', 0);
    }
};

const getUserInfo = async (): Promise<User> => {
    const { data } = await axiosSecureClient.get<User>('auth/get-user-info');
    return data;
};

export { getAccessToken, refreshAccessToken, getUserInfo, login, logout };
