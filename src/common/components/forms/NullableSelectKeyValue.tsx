import React, { FC, ReactElement } from 'react';
import { SelectKeyValue } from './SelectKeyValue';

type NullableSelectKeyValueParams = {
    allItems: { [key: string]: string };
    selectedKey: string | null;
    onSelectionChange?: (selectedKey: string | null) => void;
    label: string;
    small?: boolean;
    className?: string;
};

export const NullableSelectKeyValue: FC<NullableSelectKeyValueParams> = (params): ReactElement => {
    const allItems = { ...params.allItems };
    allItems[''] = ' - ';

    const changeSelection = (selectedKey: string) => {
        params.onSelectionChange?.(selectedKey || null);
    };

    return (
        <SelectKeyValue
            allItems={allItems}
            selectedKey={params.selectedKey ?? ''}
            onSelectionChange={changeSelection}
            label={params.label}
            small={params.small}
            className={params.className}
        />
    );
};
