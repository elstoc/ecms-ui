export type SiteConfig = {
    authEnabled: boolean;
    footerText: string;
    siteTitle: string;
};

export enum ComponentTypes {
    gallery = 'gallery',
    markdown = 'markdown',
    videodb = 'videodb',
    componentgroup = 'componentgroup'
}

export type ComponentMetadataCommon = {
    apiPath: string;
    uiPath: string;
    title: string;
    weight?: number;
    restrict?: string;
}

type GalleryMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.gallery;
    defaultComponent?: boolean;
}

type MarkdownMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.markdown;
    singlePage: boolean;
    defaultComponent?: boolean;
}

type VideoDbMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.videodb;
    defaultComponent?: boolean;
}

type ComponentGroupMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.componentgroup;
    components: ComponentMetadata[];
    defaultComponent: false;
}

export type ComponentMetadata = GalleryMetadata | MarkdownMetadata | VideoDbMetadata | ComponentGroupMetadata;
