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
    director: string | null;
    length_mins: number | null;
    watched: string;
    to_watch_priority: number | null;
    progress: string | null;
    imdb_id: string | null;
    image_url: string | null;
    year: number | null;
    actors: string | null;
    plot: string | null;
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
    director: string | null;
    length_mins: number | null;
    watched: string;
    to_watch_priority: number | null;
    progress: string | null;
    year: number | null;
    actors: string | null;
}

type PrimaryMedium = {
    pm_media_type: string | null;
    pm_watched: string | null;
}

type VideoSummaryAndPrimaryMedium = VideoSummary & PrimaryMedium;

const getVideoDbVideos = async (path: string, filters?: { [key: string]: string }): Promise<VideoSummaryAndPrimaryMedium[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoSummaryAndPrimaryMedium[]>(url, { params: { path, ...filters }});
    return data;
};

const getVideoDbVideo = async (path: string, id: number): Promise<VideoWithId> => {
    const url = 'videodb/video';
    const { data } = await axiosSecureClient.get<VideoWithId>(url, { params: { path, id }});
    return data;
};

const putVideoDbVideo = async (path: string, video: VideoWithId): Promise<void> => {
    const url = 'videodb/video';
    await axiosSecureClient.put(url, { path, video });
};

const getVideoDbTags = async (path: string): Promise<string[]> => {
    const url = 'videodb/tags';
    const { data } = await axiosSecureClient.get<string[]>(url, { params: { path } });
    return data;
};

const getVideoDbLookup = async (path: string, lookupTable: string): Promise<{ [key: string]: string }> => {
    const url = 'videodb/lookup';
    const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, { params: { path, table: lookupTable } });
    return data;
};

export {
    Video,
    VideoWithId,
    VideoSummaryAndPrimaryMedium,
    getVideoDbVideos,
    getVideoDbVideo,
    putVideoDbVideo,
    getVideoDbTags,
    getVideoDbLookup
};
