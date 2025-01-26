import { ComponentMetadataCommon, ComponentTypes, SiteConfig } from '../contracts/site.contract';
import { axiosSecureClient } from '../shared/api';

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
