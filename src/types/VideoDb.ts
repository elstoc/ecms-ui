export type Video = {
    title: string;
    category: string;
    director: string;
    length_mins: number;
    watched: string;
    to_watch_priority: number;
    progress: string;
}

export type PrimaryMedium = {
    pm_media_type: string;
    pm_watched: string;
}

type videoIdOnly = {
    id: number;
}

export type VideoWithId = Video & videoIdOnly;

export type VideoWithIdAndPrimaryMedium = VideoWithId & PrimaryMedium;

export type VideoQueryParams = {
    maxLength?: number;
    titleLike?: string;
    categories?: string;
}
