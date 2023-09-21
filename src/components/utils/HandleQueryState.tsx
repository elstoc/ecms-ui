import React, { FC, ReactElement, ReactNode } from 'react';

type props = {
    isError: boolean;
    isLoading: boolean;
    children: ReactNode;
    error?: unknown;
}

export const HandleQueryState: FC<props> = ({ children, isError, isLoading, error }): ReactElement => {
    if (isError) {
        const message = error instanceof Error ? ` (${error.message})` : '';
        return <>There has been an error{message}</>;
    } else if (isLoading) {
        return <>Loading</>;
    }
    return <>{children}</>;
};
