import { useEffect, RefObject, useRef } from 'react';

export const useElementIsVisible = (ref: RefObject<HTMLElement | null>, cb: () => void) => {
    const prevRef = useRef<HTMLElement | null>(null);

    useEffect((): void => {
        setTimeout(() => {
            const element = ref?.current;
            if (element && prevRef?.current !== element) {
                prevRef.current = element;
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            cb();
                            observer.unobserve(element);
                        }
                    }
                );
                observer.observe(element);
            }
        }, 100);
    } ,[ref, cb]);
};
