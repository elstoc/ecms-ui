import React, { FC, ReactElement } from 'react';
import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

export type KeyValue = {
    key: string;
    value: string;
}

type MultiSelectKeyValueParams = {
    allItems: { [key: string]: string };
    selectedKeys: string[];
    onSelectionChange?: (selectedKeys: string[]) => void;
    label: string;
    inline?: boolean;
    className?: string;
};

export const MultiSelectKeyValue: FC<MultiSelectKeyValueParams> = ({ allItems, selectedKeys, onSelectionChange, label, inline, className }): ReactElement => {
    const allItemsArray = Object.entries(allItems).map(([key, value]) => ({ key, value }));
    const selectedItems = selectedKeys.map((key) => ({ key, value: allItems[key] ?? '' }));

    const toggleItem = (item: KeyValue) => {
        if (!selectedKeys.includes(item.key)) {
            onSelectionChange?.([...(selectedKeys), item.key]);
        } else {
            onSelectionChange?.(selectedKeys.filter((key) => key !== item.key));
        }
    };

    const clearItems = () => {
        onSelectionChange?.([]);
    };

    const areTheyEqual = (item1: KeyValue, item2: KeyValue): boolean => {
        return item1.key === item2.key;
    };

    const itemRenderer: ItemRenderer<KeyValue> = (keyValue: KeyValue, { handleClick, handleFocus, modifiers }) => {
        return (
            <MenuItem
                text={keyValue.value}
                key={keyValue.key}
                roleStructure='listoption'
                selected={selectedKeys.includes(keyValue.key)}
                shouldDismissPopover={true}
                active={modifiers.active}
                disabled={modifiers.disabled}
                onFocus={handleFocus}
                onClick={handleClick}
            />
        );
    };

    const tagRenderer = (keyValue: KeyValue) => keyValue.value;

    return (
        <FormGroup label={label} inline={inline} className={className}>
            <MultiSelect<KeyValue>
                fill={false}
                itemRenderer={itemRenderer}
                items={allItemsArray}
                itemsEqual={areTheyEqual}
                onItemSelect={toggleItem}
                onRemove={toggleItem}
                onClear={clearItems}
                selectedItems={selectedItems}
                tagRenderer={tagRenderer}
                popoverProps={{minimal: true}}
                placeholder=''
            />
        </FormGroup>
    );
};
