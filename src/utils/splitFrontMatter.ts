export const splitFrontMatter = (text: string): [yaml: string, content: string] => {
    const lines = text.split('\n');
    if (lines[0] !== '---') {
        return ['', text];
    } else {
        const endIndex = lines.indexOf('---', 1);
        if (endIndex === -1) {
            return [lines.slice(1).join('\n'), ''];
        } else {
            return [lines.slice(1, endIndex).join('\n'), lines.slice(endIndex + 1).join('\n')];
        }
    }
};
