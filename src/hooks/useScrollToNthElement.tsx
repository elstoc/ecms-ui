import React, { createRef, useEffect } from 'react';

export const useScrollToNthElement: (elements: React.JSX.Element[], index: number) => void = (elements, index) => {
    const ref = createRef<HTMLElement>();
    if (elements[index]) {
        elements[index] = React.cloneElement(elements[index], { ...elements[index].props, ref });
    }
    useEffect(() => {
        ref?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
};
