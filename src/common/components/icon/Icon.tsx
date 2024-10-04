// See https://react-icons.github.io/react-icons for summary of available icons
import React, { FC, ReactElement } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiFlag, FiSave, FiTrash2, FiUser, FiUserX, FiX, FiPlusSquare } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { PopoverPosition, Tooltip } from '@blueprintjs/core';

import './Icon.scss';

const icons: { [key: string]: IconType} = {
    user: FiUser,
    noUser: FiUserX,
    edit: FiEdit,
    delete: FiTrash2,
    cancel: FiX,
    save: FiSave,
    next: FiChevronRight,
    previous: FiChevronLeft,
    close: FiX,
    flag: FiFlag,
    add: FiPlusSquare
};

type IconProps = {
    name: string;
    disabled?: boolean;
    onClick?: () => void;
    tooltipContent?: string;
    tooltipPosition?: PopoverPosition;
    className?: string;
    color?: string;
};

export const Icon: FC<IconProps> = ({ name, onClick, tooltipContent, tooltipPosition, disabled = false, className = '', color }): ReactElement => {
    const IconComponent = icons[name];

    if (!IconComponent) return <></>;

    const iconOnClick = disabled ? undefined : onClick;
    const iconClass = `icon ${disabled ? 'disabled' : ''} ${iconOnClick ? 'clickable' : ''} ${className}`;

    const iconElement = <IconComponent className={iconClass} onClick={iconOnClick} color={color} />;

    if (tooltipContent) {
        return (
            <Tooltip
                className='icon-tooltip'
                hoverOpenDelay={500}
                disabled={disabled}
                content={tooltipContent}
                position={tooltipPosition ?? 'left'}
            >
                {iconElement}
            </Tooltip>
        );
    }
    return iconElement;
};
