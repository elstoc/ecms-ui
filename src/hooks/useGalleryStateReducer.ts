import { useReducer } from 'react';

export type GalleryState = {
    maxImages: number;
    marginPx: number;
    batchSize: number;
    title: string;
    apiPath: string;
};

export type GalleryStateContextProps = {
    galleryState: GalleryState;
    alterGalleryState: React.Dispatch<GalleryReducerActions>;
};

type GalleryReducerIncrementAction = {
    action: 'incrementMaxImages',
    maximum: number,
};

type GalleryReducerSetAction = {
    action: 'setMaxImages',
    value: number
};

type GalleryReducerActions = GalleryReducerIncrementAction | GalleryReducerSetAction;

const galleryStateReducer: (state: GalleryState, actions: GalleryReducerActions) => GalleryState = (state, actions) => {
    if (actions.action === 'incrementMaxImages') {
        return { ...state, maxImages: Math.min(state.maxImages + state.batchSize, actions.maximum)};
    } else if (actions.action === 'setMaxImages') {
        return { ...state, maxImages: actions.value };
    }
    return state;
};

export const useGalleryStateReducer: (initialState: GalleryState) => GalleryStateContextProps = (initialState) => {
    const [galleryState, alterGalleryState] = useReducer(galleryStateReducer, initialState);
    return { galleryState, alterGalleryState };
};
