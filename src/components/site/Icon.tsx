// See https://react-icons.github.io/react-icons

import React, { FC, ReactElement } from 'react';
import { FiUser, FiUserX } from 'react-icons/fi';
import { HiOutlineCodeBracket } from 'react-icons/hi2';

import './Icon.css';

export const Icon: FC<{ name: string }> = ({ name }): ReactElement => {
    if (name === 'user') return <FiUser className='icon' />;
    if (name === 'noUser') return <FiUserX className='icon'  />;
    if (name === 'showSource') return <HiOutlineCodeBracket className='icon' />;
    return <></>;
};
