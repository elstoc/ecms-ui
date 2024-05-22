export const toIntOrUndefined = (input?: string | null): number | undefined => {
    if (input && parseInt(input).toString() === input) {
        return parseInt(input);
    }
};
