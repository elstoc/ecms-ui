import { useCallback, useEffect } from 'react';

const useMouseMove: (handler: null | ((event: MouseEvent) => void)) => void = (handler) => {
    const eventListenerFn = useCallback((ev: MouseEvent) => {
        ev.preventDefault();
        handler?.(ev);
    },[handler]);

    useEffect(() => {
        const eventListener = (ev: MouseEvent) => {
            eventListenerFn(ev);
        };

        window.addEventListener('mousemove', eventListener);

        return () => {
            window.removeEventListener('mousemove', eventListener);
        };

    }, [eventListenerFn]);
};

export default useMouseMove;
