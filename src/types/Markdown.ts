export type MdFileMeta = {
    apiPath: string;
    uiPath?: string;
    filePath?: string;
    title?: string;
    weight?: number;
}

export type MdNavContents = {
    metadata: MdFileMeta;
    children?: MdNavContents[];
}
