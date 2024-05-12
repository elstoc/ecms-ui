export type AdditionalData = {
    [key: string]: boolean | number | string | undefined; 
};

export type SiteConfig = {
    authEnabled: boolean;
    footerText: string;
};

export enum ComponentTypes {
    gallery = 'gallery',
    markdown = 'markdown',
    videodb = 'videodb'
}

export type ComponentMetadataCommon = {
    apiPath: string;
    uiPath: string;
    title: string;
    weight?: number;
    restrict?: string;
}

export type GalleryComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.gallery;
    marginPx: number;
    batchSize: number;
    threshold: number;
}

export type MarkdownComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.markdown;
    includeNav: boolean;
}

export type VideoDbComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.videodb;
}

export type ComponentMetadata = GalleryComponentMetadata | MarkdownComponentMetadata | VideoDbComponentMetadata;
