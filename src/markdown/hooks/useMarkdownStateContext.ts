import { createContext, useReducer } from 'react';
import { MarkdownPage } from '../api';

type MarkdownState = {
    rootUiPath: string;
    rootApiPath: string;
    pageApiPath: string;
    currentPage?: MarkdownPage;
    editedMarkdown: string;
    navOpen: boolean;
    singlePage: boolean;
};

type SetBooleanValue = { key: 'navOpen', value: boolean };
type SetStringValue = { key: 'pageApiPath' | 'editedMarkdown', value: string };
type SetCurrentPageDetails = { key: 'currentPageDetails', value: { currentPage: MarkdownPage, pageApiPath: string, editedMarkdown: string } };

type StateOperations = SetBooleanValue | SetStringValue | SetCurrentPageDetails;

type MarkdownStateContextProps = {
    markdownState: MarkdownState;
    markdownReducer: React.Dispatch<StateOperations>;
};

const markdownStateReducer: (state: MarkdownState, operation: StateOperations) => MarkdownState = (state, operation) => {
    if (operation.key === 'navOpen') {
        return { ...state, navOpen: operation.value };
    } else if (operation.key === 'pageApiPath') {
        return { ...state, pageApiPath: operation.value };
    } else if (operation.key === 'editedMarkdown') {
        return { ...state, editedMarkdown: operation.value };
    } else if (operation.key === 'currentPageDetails') {
        return { ...state, ...operation.value };
    }
    return state;
};

export const MarkdownStateContext = createContext({} as MarkdownStateContextProps);

export const useMarkdownState: (rootUiPath: string, rootApiPath: string, singlePage: boolean) => MarkdownStateContextProps = (rootUiPath, rootApiPath, singlePage) => {
    const initialState = { rootUiPath, rootApiPath, pageApiPath: '', singlePage, navOpen: false, editedMarkdown: '' };
    const [markdownState, markdownReducer] = useReducer(markdownStateReducer, initialState);
    return { markdownState, markdownReducer };
};
