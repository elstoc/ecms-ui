import React, { createRef } from 'react';

import { useElementIsVisible } from './useElementIsVisible';

export const useNthElementIsVisible: (elements: React.JSX.Element[], index: number, cb: () => void) => void = (elements, index, cb) => {
    const ref = createRef<HTMLElement>();
    useElementIsVisible(ref, cb);
    if (elements[index]) {
        elements[index] = React.cloneElement(elements[index], { ...elements[index].props, ref });
    }
};
