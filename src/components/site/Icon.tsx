// See https://react-icons.github.io/react-icons

import React, { FC, ReactElement } from 'react';
import { FiUser, FiUserX, FiX } from 'react-icons/fi';
import { HiOutlineCodeBracket } from 'react-icons/hi2';

import './Icon.css';
import { IconType } from 'react-icons';

export const Icon: FC<{ name: string, onClick?: () => void }> = ({ name, onClick }): ReactElement => {
    let IconComponent: IconType | undefined;
    if (name === 'user') IconComponent = FiUser;
    if (name === 'noUser') IconComponent = FiUserX;
    if (name === 'showSource') IconComponent = HiOutlineCodeBracket;
    if (name === 'cancel') IconComponent = FiX;

    return IconComponent
        ? <IconComponent className='icon' onClick={onClick} />
        : <></>;
};
