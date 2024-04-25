export const toIntOrUndefined = (input?: string): number | undefined => {
    if (input && parseInt(input).toString() === input) {
        return parseInt(input);
    }
};
