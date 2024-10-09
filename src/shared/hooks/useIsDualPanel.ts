import { useMediaQuery } from 'react-responsive';

import variables from '../../variables.module.scss';

export const useIsDualPanel = () => {
    return useMediaQuery({ query: `screen and (min-width: ${variables.minDualPanelWidth})` });
};
