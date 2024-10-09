import scssVariables from './variables.module.scss';

declare const window: {
    _env_?: { [key: string]: string }
} & Window;

const getConfig = (key: string, defaultValue: string): string => {
    return window?._env_?.[key] ?? process.env[key] ?? defaultValue;
};

export const config = {
    apiUrl: getConfig('API_URL', ''),
    queryRefetchInterval: parseInt(getConfig('QUERY_REFETCH_INTERVAL', '10000')),
    minDualPanelWidth: scssVariables.minDualPanelWidth,
};
