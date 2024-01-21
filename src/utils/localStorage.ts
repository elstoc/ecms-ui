import cookies from 'js-cookie';

export const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
    cookies.set(key, value, { expires: 7, path: '' });
    window.dispatchEvent(new Event('storage'));
};

export const getStorage = (key: string): string => {
    return cookies.get(key) ?? '';
};
