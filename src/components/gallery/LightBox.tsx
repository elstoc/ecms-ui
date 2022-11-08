import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import './LightBox.css';

const apiUrl: string = process.env.API_URL || '';

type LightBoxProps = {
    path: string;
}

const LightBox: FC<LightBoxProps> = ({ path }): ReactElement => {
    const { imageName } = useParams();
    return (
        <div className='LightBox'>
            <img src={`${apiUrl}/gallery/image/${path}/${imageName}?size=full`} alt={imageName} />
        </div>
    );
};

export default LightBox;
