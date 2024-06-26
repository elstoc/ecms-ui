import { VideoMedium, VideoWithId } from '../api';

type SetStringField = {
    key: 'title' | 'category' | 'director' | 'watched' | 'progress' | 'imdb_id' | 'image_url' | 'actors' | 'plot';
    value: string | null;
};

type SetNumericField = {
    key: 'length_mins' | 'to_watch_priority' | 'year';
    value: number | null;
};

type SetStringArrayField = {
    key: 'tags';
    value: string[]
};

type SetMedia = {
    key: 'media',
    value: VideoMedium[]
};

type SetFieldActions = SetStringField | SetNumericField | SetStringArrayField | SetMedia;

export const videoReducer: (state: VideoWithId, action: SetFieldActions) => VideoWithId = (state, action) => {
    return { ...state, [action.key]: action.value };
};
