import { useCallback, useMemo, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '../../utils';
import { VideoQueryParams } from '../api';

type SetMaxLength = { action: 'set'; key: 'maxLength'; value?: number; }
type SetTitleContains = { action: 'set'; key: 'titleContains'; value?: string; }
type SetCategories = { action: 'set'; key: 'categories'; value?: string[] }
type SetAll = { action: 'setAll'; value: VideoQueryParams }
type QueryOperations = SetMaxLength | SetTitleContains | SetCategories | SetAll;

type VideoDbQueryStateContextProps = {
    queryState: VideoQueryParams;
    queryStateReducer: React.Dispatch<QueryOperations>;
    updateSearchParamsFromState: () => void;
    querySearchParams: { [key: string]: string | undefined };
    clearAll: () => void;
};

const videoDbQueryReducer: (state: VideoQueryParams, operation: QueryOperations) => VideoQueryParams = (state, operation) => {
    if (operation.action === 'set') {
        return { ...state, [operation.key]: operation.value };
    } else if (operation.action === 'setAll') {
        return operation.value;
    }
    return state;
};

const useVideoDbQueryParams: () => VideoDbQueryStateContextProps = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [queryState, queryStateReducer] = useReducer(videoDbQueryReducer, ({
        maxLength: toIntOrUndefined(searchParams.get('maxLength') ?? undefined),
        titleContains: searchParams.get('titleContains') ?? undefined,
        categories: searchParams.get('categories')?.split('|') ?? undefined
    }));

    const querySearchParams = useMemo(() => ({
        maxLength: searchParams.get('maxLength') ?? undefined,
        titleContains: searchParams.get('titleContains') ?? undefined,
        categories: searchParams.get('categories') ?? undefined
    }), [searchParams]);

    const updateSearchParamsFromState = useCallback(() => {
        setSearchParams((params) => {
            queryState.categories?.length
                ? params.set('categories', queryState.categories.join('|'))
                : params.delete('categories');
            queryState.maxLength
                ? params.set('maxLength', queryState.maxLength.toString())
                : params.delete('maxLength');
            queryState.titleContains
                ? params.set('titleContains', queryState.titleContains)
                : params.delete('titleContains');
            return params;
        });
    }, [setSearchParams, queryState.categories, queryState.maxLength, queryState.titleContains]);

    const clearAll = useCallback(() => {
        queryStateReducer({ action: 'setAll', value: {} });
        setSearchParams({});
    }, [queryStateReducer, setSearchParams]);

    return { queryState, queryStateReducer, querySearchParams, updateSearchParamsFromState, clearAll };
};

export { VideoDbQueryStateContextProps, useVideoDbQueryParams };
