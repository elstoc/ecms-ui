import React, { FC, ReactElement, ReactNode } from 'react';

type props = {
    isError: boolean;
    isPending: boolean;
    children: ReactNode;
    error?: unknown;
}

export const HandleQueryState: FC<props> = ({ children, isError, isPending, error }): ReactElement => {
    if (isError) {
        const message = error instanceof Error ? ` (${error.message})` : '';
        return <>There has been an error{message}</>;
    } else if (isPending) {
        return <>Loading</>;
    }
    return <>{children}</>;
};
