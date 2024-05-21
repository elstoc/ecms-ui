export type User = {
    id: string;
    fullName?: string;
    roles?: string[];
    hashedPassword?: string;
};

export type IdAndAccessToken = {
    id: string,
    accessToken: string,
    accessTokenExpiry: number;
};
