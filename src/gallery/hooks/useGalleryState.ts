import { createContext, useReducer } from 'react';

const MARGIN_PX = 3;
const BATCH_SIZE = 25;

export type GalleryState = {
    maxImages: number;
    batchSize: number;
    marginPx: number;
    title: string;
    apiPath: string;
    activeImageIndex: number;
};

type GalleryStateContextProps = {
    galleryState: GalleryState;
    galleryStateReducer: React.Dispatch<GalleryReducerActions>;
};

const GalleryStateContext = createContext<GalleryStateContextProps>({} as GalleryStateContextProps);

type GalleryReducerActions = {
    action: 'setMaxImages' | 'setActiveImageIndex' | 'incrementMaxImages',
    value: number
};

const getInitialState = (apiPath: string, title: string) => ({
    apiPath, title,
    maxImages: BATCH_SIZE,
    batchSize: BATCH_SIZE,
    marginPx: MARGIN_PX,
    activeImageIndex: -1,
});

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

const useGalleryStateReducer: (initialState: GalleryState) => GalleryStateContextProps = (initialState) => {
    const [galleryState, galleryStateReducer] = useReducer(stateReducer, initialState);
    return { galleryState, galleryStateReducer };
};

export { GalleryStateContext, useGalleryStateReducer, getInitialState };
