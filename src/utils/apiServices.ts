import axios from 'axios';

export const apiGet = async <Type>(path: string): Promise<Type> => {
    const baseUrl = process.env.API_URL ?? '';
    const { data } = await axios.get<Type>(`${baseUrl}/${path}`);
    return data;
};
