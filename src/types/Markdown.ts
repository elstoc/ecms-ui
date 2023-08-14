export type MdFileMeta = {
    apiPath: string;
    title: string;
    weight?: number;
}

export type MdNavContents = {
    metadata: MdFileMeta;
    children?: MdNavContents[];
}
