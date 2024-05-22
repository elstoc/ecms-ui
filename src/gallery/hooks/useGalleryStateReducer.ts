import { useReducer } from 'react';

export type GalleryState = {
    maxImages: number;
    marginPx: number;
    batchSize: number;
    title: string;
    apiPath: string;
    activeImageIndex: number;
};

type GalleryStateContextProps = {
    galleryState: GalleryState;
    galleryStateReducer: React.Dispatch<GalleryReducerActions>;
};

type IncrementMaxImagesAction = {
    action: 'incrementMaxImages',
    maximum: number,
};

type SetMaxImagesAction = {
    action: 'setMaxImages',
    value: number
};

type SetLightboxImageAction = {
    action: 'setActiveImageIndex',
    value: number
};

type GalleryReducerActions = IncrementMaxImagesAction | SetMaxImagesAction | SetLightboxImageAction;

const stateReducer: (state: GalleryState, actions: GalleryReducerActions) => GalleryState = (state, actions) => {
    if (actions.action === 'incrementMaxImages') {
        return { ...state, maxImages: Math.min(state.maxImages + state.batchSize, actions.maximum)};
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

export { GalleryStateContextProps, useGalleryStateReducer };
