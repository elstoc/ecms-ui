import { Video } from '../api';

type SetStringField = {
    key: 'title' | 'category' | 'director' | 'watched' | 'progress' | 'imdb_id' | 'image_url' | 'actors' | 'plot';
    value: string;
};

type SetNumericField = {
    key: 'length_mins' | 'to_watch_priority' | 'year';
    value: number;
};

type SetStringArrayField = {
    key: 'tags';
    value: string[]
};

type SetFieldActions = SetStringField | SetNumericField | SetStringArrayField;

export const videoReducer: (state: Video, action: SetFieldActions) => Video = (state, action) => {
    return { ...state, [action.key]: action.value };
};
