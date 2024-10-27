import { createContext, useReducer } from 'react';

const BATCH_SIZE = 25;

export type GalleryState = {
    maxImages: number;
    batchSize: number;
    title: string;
    apiPath: string;
    activeImageIndex: number;
};

type GalleryStateContextProps = {
    galleryState: GalleryState;
    galleryStateReducer: React.Dispatch<GalleryReducerActions>;
};

type GalleryReducerActions = {
    action: 'setMaxImages' | 'setActiveImageIndex' | 'incrementMaxImages',
    value: number
};

const stateReducer: (state: GalleryState, actions: GalleryReducerActions) => GalleryState = (state, actions) => {
    if (actions.action === 'incrementMaxImages') {
        return { ...state, maxImages: Math.min(state.maxImages + state.batchSize, actions.value)};
    } else if (actions.action === 'setMaxImages') {
        return { ...state, maxImages: actions.value };
    } else if (actions.action === 'setActiveImageIndex') {
        return { ...state, activeImageIndex: actions.value };
    }
    return state;
};

export const GalleryStateContext = createContext<GalleryStateContextProps>({} as GalleryStateContextProps);

export const getInitialState = (apiPath: string, title: string) => ({
    apiPath, title,
    maxImages: BATCH_SIZE,
    batchSize: BATCH_SIZE,
    activeImageIndex: -1,
});

export const useGalleryStateReducer: (initialState: GalleryState) => GalleryStateContextProps = (initialState) => {
    const [galleryState, galleryStateReducer] = useReducer(stateReducer, initialState);
    return { galleryState, galleryStateReducer };
};
