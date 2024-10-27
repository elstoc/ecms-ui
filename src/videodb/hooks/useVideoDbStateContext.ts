import { createContext, useReducer } from 'react';

const BATCH_SIZE = 100;

type IncreaseLimit = { action: 'increaseLimit', currentlyLoaded: number }
type ResetLimit = { action: 'resetLimit' };

type StateOperations = IncreaseLimit | ResetLimit;

type VideoDbState = {
    apiPath: string;
    title: string;
    limit: number;
};

type VideoDbStateContextProps = {
    videoDbState: VideoDbState;
    videoDbReducer: React.Dispatch<StateOperations>;
};

const videoDbStateReducer: (state: VideoDbState, operation: StateOperations) => VideoDbState = (state, operation) => {
    if (operation.action === 'increaseLimit' && operation.currentlyLoaded + BATCH_SIZE >= state.limit + BATCH_SIZE) {
        return { ...state, limit: state.limit + BATCH_SIZE };
    } else if (operation.action === 'resetLimit') {
        return { ...state, limit: BATCH_SIZE };
    }
    return state;
};

export const VideoDbStateContext = createContext({} as VideoDbStateContextProps);

export const useVideoDbState: (title: string, apiPath: string) => VideoDbStateContextProps = (title, apiPath) => {
    const initialState = { title, apiPath, limit: BATCH_SIZE, pendingFlagUpdates: [] };
    const [videoDbState, videoDbReducer] = useReducer(videoDbStateReducer, initialState);
    return { videoDbState, videoDbReducer };
};
