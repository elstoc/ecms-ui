import { useCallback, useEffect } from 'react';

const useKeyPress: (keys: string[], handler: (event: KeyboardEvent) => void) => void = (keys, handler) => {
    const eventListenerFn = useCallback((ev: KeyboardEvent) => {
        if (keys.includes(ev.key)) {
            handler?.(ev);
        }
    },[keys, handler]);

    useEffect(() => {
        const eventListener = (ev: KeyboardEvent) => {
            eventListenerFn(ev);
        };

        window.addEventListener('keydown', eventListener);

        return () => {
            window.removeEventListener('keydown', eventListener);
        };

    }, [eventListenerFn]);
};

export default useKeyPress;
