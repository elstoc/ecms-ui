import { OverlayToaster, Position } from '@blueprintjs/core';
import { createRoot } from 'react-dom/client';

const AppToaster = OverlayToaster.createAsync({
    position: Position.TOP,
}, {
    domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster) 
});

export const showToast = async (message: string, timeout?: number) => {
    (await AppToaster).show({ message, timeout });
};
