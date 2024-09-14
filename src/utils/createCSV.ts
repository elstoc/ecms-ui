type StringParam<T> = {
    title: string;
    getField: (record: T) => string | null;
}

type NumericParam<T> = {
    title: string;
    getField: (record: T) => number | null;
}

export type ColumnParam<T> = StringParam<T> | NumericParam<T>;

export const createCSV = <T,>(columnParams: ColumnParam<T>[], data: T[]): string => {
    const rows: string[] = [];

    // Add headers
    rows.push(columnParams.map((columnParam) => `"${columnParam.title.replace('"', '')}"`).join(','));

    // Add rows
    data.forEach((row) => {
        const fields: string[] = [];
        columnParams.forEach((columnParam) => {
            const field = columnParam.getField(row);
            if (typeof field === 'string') {
                fields.push(`"${field.replace('"', '')}"`);
            } else if (typeof field === 'number') {
                fields.push(field.toString());
            } else {
                fields.push('');
            }
        });
        rows.push(fields.join(','));
    });

    return rows.join('\n');
};
