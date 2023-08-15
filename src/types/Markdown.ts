import { AdditionalData } from './Site';

export type MdNavContents = {
    apiPath?: string;
    title?: string;
    uiPath?: string;
    weight?: number;
    additionalData?: AdditionalData;
    children?: MdNavContents[];
}
