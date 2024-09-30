import { createContext, useReducer } from 'react';

const BATCH_SIZE = 100;

type IncreaseLimit = { action: 'increaseLimit', currentlyLoaded: number }
type ResetLimit = { action: 'resetLimit' };
type SetUpdatedFlag = { action: 'setUpdatedFlag', videoId: number,  currValue: number | null, newValue: 0 | 1 };
type ResetFlagUPdates = { action: 'resetFlagUpdates' };

type StateOperations = IncreaseLimit | ResetLimit | SetUpdatedFlag | ResetFlagUPdates;

type FlagUpdates = { [videoId: number]: 0 | 1 }

type VideoDbState = {
    apiPath: string;
    title: string;
    limit: number;
    pendingFlagUpdates: FlagUpdates;
};

type VideoDbStateContextProps = {
    state: VideoDbState;
    stateReducer: React.Dispatch<StateOperations>;
};

const videoDbQueryReducer: (state: VideoDbState, operation: StateOperations) => VideoDbState = (state, operation) => {
    if (operation.action === 'increaseLimit' && operation.currentlyLoaded + BATCH_SIZE >= state.limit + BATCH_SIZE) {
        return { ...state, limit: state.limit + BATCH_SIZE };
    } else if (operation.action === 'resetLimit') {
        return { ...state, limit: BATCH_SIZE };
    } else if (operation.action === 'setUpdatedFlag') {
        const { pendingFlagUpdates } = state;
        if (Boolean(operation.currValue) === Boolean(operation.newValue)) {
            delete pendingFlagUpdates[operation.videoId];
        } else {
            pendingFlagUpdates[operation.videoId] = operation.newValue;
        }
        return { ...state, pendingFlagUpdates };
    } else if (operation.action === 'resetFlagUpdates') {
        return { ...state, pendingFlagUpdates: {} };
    }
    return state;
};

export const VideoDbContext = createContext({} as VideoDbStateContextProps);

export const useVideoDbState: (title: string, apiPath: string) => VideoDbStateContextProps = (title, apiPath) => {
    const initialState = { title, apiPath, limit: BATCH_SIZE, pendingFlagUpdates: [] };
    const [state, stateReducer] = useReducer(videoDbQueryReducer, initialState);
    return { state, stateReducer };
};
