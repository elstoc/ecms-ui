import { useReducer } from 'react';
import { VideoWithId } from '../../contracts/videodb';

type SetStringField = {
    key: 'title' | 'category' | 'director' | 'watched' | 'progress' | 'imdb_id' | 'image_url' | 'actors' | 'plot' | 'tags'
       | 'primary_media_type' | 'primary_media_location' | 'primary_media_watched' | 'other_media_type' | 'other_media_location' | 'media_notes';
    value: string | null;
};

type SetNumericField = {
    key: 'num_episodes' | 'length_mins' | 'priority_flag' | 'year';
    value: number | null;
};

type SetFieldActions = SetStringField | SetNumericField;

const videoReducer: (state: VideoWithId, action: SetFieldActions) => VideoWithId = (state, action) => {
    return { ...state, [action.key]: action.value };
};

export const useEditVideoReducer = (initialState: VideoWithId) => useReducer(videoReducer, initialState);
