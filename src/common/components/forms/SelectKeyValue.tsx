import React, { FC, ReactElement } from 'react';
import { Button, FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';

export type KeyValue = {
    key: string;
    value: string;
}

type SelectKeyValueParams = {
    allItems: { [key: string]: string };
    selectedKey: string;
    onSelectionChange?: (selectedKey: string) => void;
    label: string;
};

export const SelectKeyValue: FC<SelectKeyValueParams> = ({ allItems, selectedKey, onSelectionChange, label }): ReactElement => {
    const allItemsArray = Object.entries(allItems).map(([key, value]) => ({ key, value }));

    const itemRenderer: ItemRenderer<KeyValue> = (keyValue: KeyValue) => {
        return (
            <MenuItem
                text={keyValue.value}
                key={keyValue.key}
                roleStructure='listoption'
                onClick={() => onSelectionChange?.(keyValue.key)}
            />
        );
    };

    return (
        <FormGroup label={label} inline={false}>
            <Select<KeyValue>
                items={allItemsArray}
                itemRenderer={itemRenderer}
                onItemSelect={() => undefined}
                filterable={false}
                popoverProps={{minimal: true}}
            >
                <Button text={allItems[selectedKey]} rightIcon='caret-down' />
            </Select>
        </FormGroup>
    );
};
