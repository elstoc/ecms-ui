import React, { FC, ReactElement, useContext } from 'react';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

import { NullableSelectKeyValue } from '../../common/components/forms';

type NullableSelectLookupParams = {
    lookupTable: string;
    selectedKey: string | null;
    onSelectionChange?: (selectedKey: string | null) => void;
    label: string;
    small?: boolean;
    className?: string;
    inline?: boolean;
    nullValueRepr?: string;
};

export const NullableSelectLookup: FC<NullableSelectLookupParams> = (props): ReactElement => {
    const { lookupTable, selectedKey, onSelectionChange, label, small, className, inline, nullValueRepr } = props;
    const { state: { apiPath } } = useContext(VideoDbContext);
    const lookupKeyValues = useGetLookup(apiPath, lookupTable);

    return (
        <NullableSelectKeyValue
            label={label}
            allItems={lookupKeyValues}
            onSelectionChange={onSelectionChange}
            selectedKey={selectedKey}
            small={small}
            className={className}
            inline={inline}
            nullValueRepr={nullValueRepr}
        />
    );
};
