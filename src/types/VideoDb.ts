export type Video = {
    name: string;
    category: string;
    director: string;
    length_mins: number;
    to_watch_priority: number;
    progress: string;
}

type videoIdOnly = {
    id: number;
}

export type VideoWithId = Video & videoIdOnly;

export type VideoQueryParams = {
   maxLength?: number;
}
