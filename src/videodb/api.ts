import { axiosSecureClient } from '../shared/api';

type Video = {
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

type VideoWithId = Video & { id: number; };

type VideoUpdate = {
    id: number;
    priority_flag: 0 | 1;
}

const getVideoDbVideos = async (path: string, filters?: { [key: string]: string }): Promise<VideoWithId[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoWithId[]>(url, { params: { path, ...filters }});
    return data;
};

const patchVideoDbVideos = async (path: string, videoUpdates: VideoUpdate[]): Promise<void> => {
    const url = 'videodb/videos';
    await axiosSecureClient.patch(url, { path, videos: videoUpdates });
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

const postVideoDbVideo = async (path: string, video: Video): Promise<number> => {
    const url = 'videodb/video';
    const { data } = await axiosSecureClient.post<{ id: number }>(url, { path, video });
    return data.id;
};

const deleteVideoDbVideo = async (path: string, id: number): Promise<void> => {
    const url = 'videodb/video';
    const { data } = await axiosSecureClient.delete(url, { params: { path, id } });
    return data.id;
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
    VideoUpdate,
    getVideoDbVideos,
    patchVideoDbVideos,
    getVideoDbVideo,
    putVideoDbVideo,
    postVideoDbVideo,
    deleteVideoDbVideo,
    getVideoDbTags,
    getVideoDbLookup
};
