const getStorage = (key: string): string => {
    return localStorage.getItem(key) ?? '';
};

const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
};

export { getStorage, setStorage };
