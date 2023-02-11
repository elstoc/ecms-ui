export type MdFileMeta = {
    uiPath: string;
    filePath?: string;
    title?: string;
    weight?: number;
}

export type MdNavContents = {
    metadata: MdFileMeta;
    children?: MdNavContents[];
}
