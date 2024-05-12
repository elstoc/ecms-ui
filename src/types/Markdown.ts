export type MarkdownTree = {
    apiPath: string;
    title?: string;
    uiPath?: string;
    weight?: number;
    restrict?: string;
    allowWrite?: string;
    children?: MarkdownTree[];
}

export type MarkdownPage = {
    content: string;
    pageExists: boolean;
    canWrite: boolean;
    canDelete: boolean;
    pathValid: boolean;
}
