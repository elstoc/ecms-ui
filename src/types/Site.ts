export type AdditionalData = {
    [key: string]: boolean | number | string | undefined; 
};

export type SiteConfig = {
    authEnabled: boolean;
    footerText: string;
};

export type ComponentMetadata = {
    apiPath: string;
    uiPath: string;
    title: string;
    type: string;
    weight?: number;
    restrict?: string;
    additionalData: AdditionalData;
}
