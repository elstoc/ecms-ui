export type Video = {
    title: string;
    category: string;
    director: string | null;
    num_episodes: number | null;
    length_mins: number | null;
    watched: string;
    priority_flag: number | null;
    progress: string | null;
    year: number | null;
    imdb_id: string | null;
    image_url: string | null;
    actors: string | null;
    plot: string | null;
    tags: string | null;
    primary_media_type: string | null;
    primary_media_location: string | null;
    primary_media_watched: string | null;
    other_media_type: string | null;
    other_media_location: string | null;
    media_notes: string | null;
}

export type VideoWithId = Video & { id: number; };

export type VideoUpdate = {
    id: number;
    priority_flag: 0 | 1;
}
