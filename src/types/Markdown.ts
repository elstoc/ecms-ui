export type MdFileMeta = {
    uiPath: string;
    filePath?: string;
    title?: string;
    weight?: number;
}

export type MdNavContents = {
    meta: MdFileMeta;
    children?: MdNavContents[];
}
