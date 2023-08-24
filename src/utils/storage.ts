export const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
};

export const getStorage = (key: string): string => {
    return localStorage.getItem(key) ?? '';
};
