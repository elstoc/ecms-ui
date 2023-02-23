export type ComponentMetadata = {
    apiPath: string;
    uiPath: string;
    title: string;
    type: string;
    weight?: number;
    restrict?: string;
    [key: string]: boolean | number | string | undefined;
}
