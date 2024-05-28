import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '../../utils';

const BATCH_SIZE = 100;

type SetMaxLength = { action: 'setFilter'; key: 'maxLength'; value: number | null; }
type SetTitleContains = { action: 'setFilter'; key: 'titleContains'; value: string | null; }
type SetCategories = { action: 'setFilter'; key: 'categories'; value: string[] | null}
type SetAll = { action: 'setAllFilters'; value: VideoFilters }
type IncreaseLimit = { action: 'increaseLimit', currentlyLoaded: number }
type QueryOperations = SetMaxLength | SetTitleContains | SetCategories | SetAll | IncreaseLimit;

type VideoFilters = {
    limit: number;
    maxLength: number | null;
    categories: string[] | null;
    tags: string[] | null;
    titleContains: string | null;
}

type VideoDbState = {
    apiPath: string;
    title: string;
    filters: VideoFilters;
};

const initialFilters = {
    limit: BATCH_SIZE,
    maxLength: null,
    categories: null,
    tags: null,
    titleContains: null
};

type VideoDbStateContextProps = {
    state: VideoDbState;
    stateReducer: React.Dispatch<QueryOperations>;
};

const VideoDbContext = createContext({} as VideoDbStateContextProps);

const videoDbQueryReducer: (state: VideoDbState, operation: QueryOperations) => VideoDbState = (state, operation) => {
    const { filters } = state;

    if (operation.action === 'setFilter') {
        return { ...state, filters: { ...filters, [operation.key]: operation.value } };
    } else if (operation.action === 'setAllFilters') {
        return { ...state, filters: operation.value };
    } else if (operation.action === 'increaseLimit' && operation.currentlyLoaded + BATCH_SIZE >= state.filters.limit + BATCH_SIZE) {
        return { ...state, filters: { ...filters, limit: state.filters.limit + BATCH_SIZE } };
    }
    return state;
};

const useGetFilterSearchParams = () => {
    const [searchParams] = useSearchParams();

    return useCallback(() => {
        const { maxLength, titleContains, categories } = Object.fromEntries(searchParams.entries());
        return { maxLength, titleContains, categories };
    }, [searchParams]);
};

const useUpdateStateOnSearchParamChange = () => {
    const [searchParams] = useSearchParams();
    const { stateReducer } = useContext(VideoDbContext);

    useEffect(() => {
        if (!searchParams.get('id')) {
            stateReducer({
                action: 'setAllFilters',
                value: {
                    limit: BATCH_SIZE,
                    maxLength: toIntOrUndefined(searchParams.get('maxLength')) ?? null,
                    titleContains: searchParams.get('titleContains'),
                    categories: searchParams.get('categories')?.split('|') ?? null,
                    tags: null
                }
            });
        }
    }, [searchParams, stateReducer]);
};

const useSetSearchParamsFromFilterState = () => {
    const [, setSearchParams] = useSearchParams();
    const { state: { filters } } = useContext(VideoDbContext);

    return useCallback(() => {
        const { categories, maxLength, titleContains } = filters;
        setSearchParams((params) => {
            categories?.length
                ? params.set('categories', categories.join('|'))
                : params.delete('categories');
            maxLength
                ? params.set('maxLength', maxLength.toString())
                : params.delete('maxLength');
            titleContains
                ? params.set('titleContains', titleContains)
                : params.delete('titleContains');
            return params;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setSearchParams, JSON.stringify(filters)]);
};

const useClearSearchParams = () => {
    const [, setSearchParams] = useSearchParams();

    return useCallback(() => {
        setSearchParams({});
    }, [setSearchParams]);
};

const useVideoDbState: (initialState: VideoDbState) => VideoDbStateContextProps = (initialState) => {
    const [state, stateReducer] = useReducer(videoDbQueryReducer, initialState);
    return { state, stateReducer };
};

export { initialFilters, VideoDbContext, useVideoDbState, useGetFilterSearchParams, useSetSearchParamsFromFilterState, useClearSearchParams, useUpdateStateOnSearchParamChange };
