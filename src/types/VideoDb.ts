export type VideoMedia = {
    media_type: string;
    media_location?: string;
    watched?: string;
    notes?: string;
}

export type Video = {
    title: string;
    category: string;
    director: string;
    length_mins: number;
    watched: string;
    to_watch_priority: number;
    progress: string;
    imdb_id: string;
    image_url: string;
    year: number;
    actors: string;
    plot: string;
    media?: VideoMedia[];
    tags?: string[];
}

type VideoIdOnly = {
    id: number;
}

export type VideoWithId = Video & VideoIdOnly;

export type VideoSummary = {
    id: string;
    title: string;
    category: string;
    director: string;
    length_mins: number;
    watched: string;
    to_watch_priority: number;
    progress: string;
    year: number;
    actors: string;
    pm_media_type: string;
    pm_watched: string;
}

export type PrimaryMedium = {
    pm_media_type: string;
    pm_watched: string;
}

export type VideoSummaryAndPrimaryMedium = VideoSummary & PrimaryMedium;

export type VideoQueryParams = {
    maxLength?: number;
    categories?: string[];
    tags?: string[];
    titleLike?: string;
}
