import React, { FC, ReactElement } from 'react';

import { SelectKeyValue } from './SelectKeyValue';

type NullableSelectKeyValueParams = {
    allItems: { [key: string]: string };
    selectedKey: string | null;
    onSelectionChange?: (selectedKey: string | null) => void;
    label: string;
    small?: boolean;
    className?: string;
    inline?: boolean;
    nullValueRepr?: string;
};

export const NullableSelectKeyValue: FC<NullableSelectKeyValueParams> = (params): ReactElement => {
    const allItems = { ...params.allItems };
    const { selectedKey, label, small, className, inline, nullValueRepr } = params;
    allItems[''] = nullValueRepr || ' — ';

    const changeSelection = (selectedKey: string) => {
        params.onSelectionChange?.(selectedKey || null);
    };

    return (
        <SelectKeyValue
            allItems={allItems}
            selectedKey={selectedKey ?? ''}
            onSelectionChange={changeSelection}
            label={label}
            small={small}
            className={className}
            inline={inline}
        />
    );
};
