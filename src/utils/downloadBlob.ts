export const downloadBlob = (blob: Blob, fileName: string): void => {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
};
