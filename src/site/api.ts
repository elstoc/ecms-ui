import { axiosSecureClient } from '../api/axiosClients';

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
}

export type MarkdownComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.markdown;
    includeNav: boolean;
}

export type VideoDbComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.videodb;
}

export type ComponentMetadata = GalleryComponentMetadata | MarkdownComponentMetadata | VideoDbComponentMetadata;

export const getSiteComponents = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axiosSecureClient.get<ComponentMetadata[]>('site/components');
    return data;
};

export const getSiteConfig = async (): Promise<SiteConfig> => {
    const { data } = await axiosSecureClient.get<SiteConfig>('site/config');
    return data;
};
