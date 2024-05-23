import { axiosSecureClient } from '../common/api';

type VideoMedia = {
    media_type: string;
    media_location?: string;
    watched?: string;
    notes?: string;
}

type Video = {
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

type VideoWithId = Video & VideoIdOnly;

type VideoSummary = {
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
}

type PrimaryMedium = {
    pm_media_type: string;
    pm_watched: string;
}

type VideoSummaryAndPrimaryMedium = VideoSummary & PrimaryMedium;

type VideoFilters = {
    maxLength?: number;
    categories?: string[];
    tags?: string[];
    titleContains?: string;
}


const getVideoDbVideos = async (path: string, filters?: VideoFilters): Promise<VideoSummaryAndPrimaryMedium[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoSummaryAndPrimaryMedium[]>(url, { params: { path, ...filters }});
    return data;
};

const getVideoDbVideo = async (path: string, id: number): Promise<VideoWithId> => {
    const url = 'videodb/video';
    const { data } = await axiosSecureClient.get<VideoWithId>(url, { params: { path, id }});
    return data;
};

const getVideoDbLookup = async (path: string, lookupTable: string): Promise<{ [key: string]: string }> => {
    const url = 'videodb/lookup';
    const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, { params: { path, table: lookupTable } });
    return data;
};

export { VideoFilters, VideoSummaryAndPrimaryMedium, getVideoDbVideos, getVideoDbVideo, getVideoDbLookup };
