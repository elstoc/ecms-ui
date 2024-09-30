import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '../../utils';
import { VideoDbContext } from './useVideoDbState';

type FilterState = {
    maxLength: number | null;
    categories: string | null;
    tags: string | null;
    titleContains: string | null;
    watched: string | null;
    mediaWatched: string | null;
    minResolution: string | null;
    sortPriorityFirst: 0 | 1 | null;
}

const initialFilters: FilterState = {
    maxLength: null, categories: null, tags: null, titleContains: null,
    watched: 'All', mediaWatched: 'All', minResolution: 'SD',
    sortPriorityFirst: null
};

type SetStringField = {
    action: 'setFilter'; 
    key: 'titleContains' | 'categories' | 'tags' | 'watched' | 'mediaWatched' | 'minResolution';
    value: string | null;
}

type SetNumericField = {
    action: 'setFilter';
    key: 'maxLength';
    value: number | null;
}

type SetBooleanIntField = {
    action: 'setFilter';
    key: 'sortPriorityFirst';
    value: 0 | 1 | null;
};

type SetIndividualFilter = SetStringField | SetNumericField | SetBooleanIntField;

type FilterOperations = SetIndividualFilter | { action: 'setAllFilters'; value: FilterState };

const filterReducer: (state: FilterState, operation: FilterOperations) => FilterState = (state, operation) => {
    if (operation.action === 'setFilter') {
        return { ...state, [operation.key]: operation.value };
    } else if (operation.action === 'setAllFilters') {
        return { ...operation.value };
    }
    return state;
};

const getSearchParamsFromState: (params: URLSearchParams, state: FilterState) => URLSearchParams = (params, state) => {
    const { titleContains, maxLength, categories, watched, mediaWatched, minResolution, tags, sortPriorityFirst } = state;
    categories?.length
        ? params.set('categories', categories)
        : params.delete('categories');
    maxLength
        ? params.set('maxLength', maxLength.toString())
        : params.delete('maxLength');
    titleContains
        ? params.set('titleContains', titleContains)
        : params.delete('titleContains');
    tags
        ? params.set('tags', tags)
        : params.delete('tags');
    watched && ['Y', 'N'].includes(watched)
        ? params.set('watched', watched)
        : params.delete('watched');
    mediaWatched && ['Y', 'N'].includes(mediaWatched)
        ? params.set('mediaWatched', mediaWatched)
        : params.delete('mediaWatched');
    minResolution && ['HD','UHD'].includes(minResolution)
        ? params.set('minResolution', minResolution)
        : params.delete('minResolution');
    sortPriorityFirst
        ? params.set('sortPriorityFirst', sortPriorityFirst ? '1' : '0')
        : params.delete('sortPriorityFirst');
    return params;
};

export const useVideoDbFilterState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { videoDbReducer } = useContext(VideoDbContext);
    const [state, stateReducer] = useReducer(filterReducer, initialFilters);
    const [syncState, setSyncState] = useState(false);

    const handlerRef = useRef<NodeJS.Timeout | null>(null);

    // set state from search params on initial load
    useEffect(() => {
        stateReducer({
            action: 'setAllFilters',
            value: {
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

    // update search params to match state when instructed
    useEffect(() => {
        if (syncState) {
            setSyncState(false);
            videoDbReducer({ action: 'resetLimit' });
            setSearchParams((params) => getSearchParamsFromState(params, state));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncState]);

    const clearAllFilters = useCallback(() => {
        stateReducer({ action: 'setAllFilters', value: initialFilters });
        setSearchParams();
    }, [setSearchParams, stateReducer]);

    const updateState = useCallback((operation: SetIndividualFilter) => {
        // update state immediately
        stateReducer(operation);

        // update search params with a delay (debounce)
        if (handlerRef.current) {
            clearTimeout(handlerRef.current);
            handlerRef.current = null;
        }

        // delay should be longer for typed fields
        const timeout = ['titleContains', 'maxLength'].includes(operation.key) ? 1000 : 10;

        handlerRef.current = setTimeout(() => {
            setSyncState(true);
        }, timeout);
    }, [stateReducer]);

    return { state, updateState, clearAllFilters };
};
