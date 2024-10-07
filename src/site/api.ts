import { axiosSecureClient } from '../common/api';

type SiteConfig = {
    authEnabled: boolean;
    footerText: string;
    siteTitle?: string;
};

enum ComponentTypes {
    gallery = 'gallery',
    markdown = 'markdown',
    videodb = 'videodb',
    componentgroup = 'componentgroup'
}

type ComponentMetadataCommon = {
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

export type ComponentGroupMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.componentgroup;
    components: ComponentMetadata[];
    defaultComponent: false;
}

type ComponentMetadata = GalleryMetadata | MarkdownMetadata | VideoDbMetadata | ComponentGroupMetadata;

const getSiteComponents = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axiosSecureClient.get<ComponentMetadata[]>('site/components');
    return data;
};

const getSiteConfig = async (): Promise<SiteConfig> => {
    const { data } = await axiosSecureClient.get<SiteConfig>('site/config');
    return data;
};

export { ComponentTypes, GalleryMetadata, VideoDbMetadata, MarkdownMetadata, ComponentMetadata, getSiteComponents, getSiteConfig };
