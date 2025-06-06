import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';
axios.defaults.baseURL = API_BASE_URL;

export class Response<Type> {
    constructor(
        public readonly success: boolean,
        public readonly message: Type) { }
}

export const request = async <Type>(url: string, method: string, data: object={}, params: object={}): Promise<Response<Type>> => {
    try {
        const res = await axios.request({
            url,
            method,
            data,
            params,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return new Response(true, res.data);
    }
    catch (err) {
        return new Response(false, err.response ? err.response.data : err);
    }
};