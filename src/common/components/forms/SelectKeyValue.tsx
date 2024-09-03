import React, { FC, ReactElement } from 'react';
import { Button, FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';

export type KeyValue = {
    key: string;
    value: string;
}

type SelectKeyValueParams = {
    allItems: { [key: string]: string };
    selectedKey: string;
    onSelectionChange?: (selectedKey: string) => void;
    label: string;
    small?: boolean;
    className?: string;
};

export const SelectKeyValue: FC<SelectKeyValueParams> = ({ allItems, selectedKey, onSelectionChange, label, small, className }): ReactElement => {
    const allItemsArray = Object.entries(allItems).map(([key, value]) => ({ key, value }));

    const changeSelection = (kv: KeyValue) => {
        onSelectionChange?.(kv.key);
    };

    const filterValue: ItemPredicate<KeyValue> = (query, item) => {
        return query.length === 0 || item.value.toLowerCase().includes(query.toLowerCase());
    };

    const itemRenderer: ItemRenderer<KeyValue> = (keyValue: KeyValue, { handleClick, handleFocus, modifiers }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                text={keyValue.value}
                key={keyValue.key}
                roleStructure='listoption'
                active={modifiers.active}
                disabled={modifiers.disabled}
                onFocus={handleFocus}
                onClick={handleClick}
                selected={keyValue.key === selectedKey}
            />
        );
    };

    return (
        <FormGroup label={label} inline={false}>
            <Select<KeyValue>
                items={allItemsArray.sort((a, b) => a.value.localeCompare(b.value))}
                itemRenderer={itemRenderer}
                itemPredicate={filterValue}
                onItemSelect={changeSelection}
                popoverProps={{minimal: true}}
                resetOnSelect={true}
                className={className}
            >
                <Button text={allItems[selectedKey] ?? ' '} small={small} rightIcon='caret-down' />
            </Select>
        </FormGroup>
    );
};
