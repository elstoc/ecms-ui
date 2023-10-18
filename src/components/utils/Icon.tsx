// See https://react-icons.github.io/react-icons for summary of available icons
// See https://github.com/primer/react/blob/main/src/Tooltip.tsx for clues about how to style your own tooltip component

import React, { FC, ReactElement } from 'react';
import { FiChevronLeft, FiChevronRight, FiSave, FiUser, FiUserX, FiX } from 'react-icons/fi';
import { GrCode } from 'react-icons/gr';

import { IconType } from 'react-icons';
import { Tooltip } from '@primer/react';
import './Icon.scss';

const icons: { [key: string]: IconType} = {
    user: FiUser,
    noUser: FiUserX,
    showSource: GrCode,
    cancel: FiX,
    save: FiSave,
    next: FiChevronRight,
    previous: FiChevronLeft,
    close: FiX
};

type IconProps = {
    name: string;
    disabled?: boolean;
    onClick?: () => void;
    tooltipContent?: string;
    tooltipDirection?: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
};

export const Icon: FC<IconProps> = ({ name, onClick, tooltipContent, tooltipDirection, disabled = false }): ReactElement => {
    const IconComponent = icons[name];

    if (!IconComponent) return <></>;

    const iconOnClick = disabled ? undefined : onClick;
    const iconClass = `icon ${disabled ? 'disabled' : ''}`;

    const iconElement = <IconComponent className={iconClass}  onClick={iconOnClick} />;

    if (tooltipContent) {
        return (
            <Tooltip className='icon-tooltip' aria-label={tooltipContent} direction={tooltipDirection ?? 'w'}>
                {iconElement}
            </Tooltip>
        );
    }
    return iconElement;
};
