import { useMediaQuery } from 'react-responsive';

import { config } from '../../utils';

export const useIsDualPanel = () => {
    return useMediaQuery({ query: `screen and (min-width: ${config.minDualPanelWidth})` });
};
