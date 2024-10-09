import { OverlayToaster, Position } from '@blueprintjs/core';
import { createRoot } from 'react-dom/client';

export const AppToaster = OverlayToaster.createAsync({
    position: Position.TOP,
}, {
    domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster) 
});
