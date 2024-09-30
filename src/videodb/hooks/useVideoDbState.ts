import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '../../utils';

const BATCH_SIZE = 100;

type SetMaxLength = { action: 'setFilter'; key: 'maxLength'; value: number | null; }
type SetTitleContains = { action: 'setFilter'; key: 'titleContains'; value: string | null; }
type SetCategories = { action: 'setFilter'; key: 'categories'; value: string | null; }
type SetTags = { action: 'setFilter'; key: 'tags'; value: string | null; }
type SetWatched = { action: 'setFilter'; key: 'watched'; value: string | null; }
type SetMediaWatched = { action: 'setFilter'; key: 'mediaWatched'; value: string | null; }
type SetMinResolution = { action: 'setFilter'; key: 'minResolution'; value: string | null; }
type SetSortPriorityFirst = { action: 'setFilter'; key: 'sortPriorityFirst'; value: 0 | 1 | null; };

type SetFilterOperations = SetMaxLength | SetTitleContains | SetCategories | SetTags | SetWatched | SetMediaWatched | SetMinResolution | SetSortPriorityFirst;

type SetAll = { action: 'setAllFilters'; value: VideoFilters }
type IncreaseLimit = { action: 'increaseLimit', currentlyLoaded: number }
type ResetLimit = { action: 'resetLimit' };
type SetUpdatedFlag = { action: 'setUpdatedFlag', videoId: number,  currValue: number | null, newValue: 0 | 1 };
type ResetFlagUPdates = { action: 'resetFlagUpdates' };

type QueryOperations = SetFilterOperations | SetAll | IncreaseLimit | ResetLimit | SetUpdatedFlag | ResetFlagUPdates;

type VideoFilters = {
    limit: number;
    maxLength: number | null;
    categories: string | null;
    tags: string | null;
    titleContains: string | null;
    watched: string | null;
    mediaWatched: string | null;
    minResolution: string | null;
    sortPriorityFirst: 0 | 1 | null;
}

type FlagUpdates = { [videoId: number]: 0 | 1 }

type VideoDbState = {
    apiPath: string;
    title: string;
    filters: VideoFilters;
    pendingFlagUpdates: FlagUpdates;
};

const initialFilters = {
    limit: BATCH_SIZE,
    maxLength: null,
    categories: null,
    tags: null,
    titleContains: null,
    watched: 'All',
    mediaWatched: 'All',
    minResolution: 'SD',
    sortPriorityFirst: null
};

type VideoDbStateContextProps = {
    state: VideoDbState;
    stateReducer: React.Dispatch<QueryOperations>;
};

const VideoDbContext = createContext({} as VideoDbStateContextProps);

const useSetInitialState = () => {
    const [searchParams] = useSearchParams();
    const { stateReducer } = useContext(VideoDbContext);

    useEffect(() => {
        stateReducer({
            action: 'setAllFilters',
            value: {
                limit: BATCH_SIZE,
                maxLength: toIntOrUndefined(searchParams.get('maxLength')) ?? null,
                titleContains: searchParams.get('titleContains'),
                categories: searchParams.get('categories') ?? null,
                tags: searchParams.get('tags') ?? null,
                watched: searchParams.get('watched') ?? 'All',
                mediaWatched: searchParams.get('mediaWatched') ?? 'All',
                minResolution: searchParams.get('minResolution') ?? 'SD',
                sortPriorityFirst: (toIntOrUndefined(searchParams.get('sortPriorityFirst')) as null | 0 | 1) ?? null
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

const videoDbQueryReducer: (state: VideoDbState, operation: QueryOperations) => VideoDbState = (state, operation) => {
    const { filters } = state;

    if (operation.action === 'setFilter') {
        return { ...state, filters: { ...filters, [operation.key]: operation.value } };
    } else if (operation.action === 'setAllFilters') {
        return { ...state, filters: operation.value };
    } else if (operation.action === 'increaseLimit' && operation.currentlyLoaded + BATCH_SIZE >= state.filters.limit + BATCH_SIZE) {
        return { ...state, filters: { ...filters, limit: state.filters.limit + BATCH_SIZE } };
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

const useSearchParamsReducer = () => {
    const [, setSearchParams] = useSearchParams();

    return useCallback((operation: SetFilterOperations) => {
        const { key, value } = operation;
        let newParamValue: string | null = null;

        setSearchParams((params) => {
            if (value !== null) {
                if (key === 'watched' || key === 'mediaWatched') {
                    if (['Y', 'N'].includes(value)) {
                        newParamValue = value;
                    }
                } else if (key === 'minResolution') {
                    if (['HD', 'UHD'].includes(value)) {
                        newParamValue = value;
                    }
                } else if (key === 'sortPriorityFirst') {
                    newParamValue = value ? '1' : null;
                } else if (key === 'tags') {
                    newParamValue = value || null;
                } else {
                    newParamValue = value.toString();
                }
            }
            newParamValue === null
                ? params.delete(key)
                : params.set(key, newParamValue);
            return params;
        });
    }, [setSearchParams]);
};

const useGetFilterSearchParams = () => {
    const [searchParams] = useSearchParams();

    return useCallback(() => {
        const { maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst } = Object.fromEntries(searchParams.entries());
        return { maxLength, titleContains, categories, tags, watched, mediaWatched, minResolution, sortPriorityFirst };
    }, [searchParams]);
};

const useClearFilterParams = () => {
    const [, setSearchParams] = useSearchParams();
    const { stateReducer } = useContext(VideoDbContext);

    return useCallback(() => {
        stateReducer({ action: 'setAllFilters', value: initialFilters });
        setSearchParams();
    }, [setSearchParams, stateReducer]);
};

const useVideoDbState: (initialState: VideoDbState) => VideoDbStateContextProps = (initialState) => {
    const [state, stateReducer] = useReducer(videoDbQueryReducer, initialState);
    return { state, stateReducer };
};

export {
    initialFilters,
    VideoDbContext,
    useVideoDbState,
    useSearchParamsReducer,
    SetFilterOperations,
    useGetFilterSearchParams,
    useClearFilterParams,
    useSetInitialState,
    FlagUpdates
};
