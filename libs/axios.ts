import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

export const setAxiosAuthToken = (token: string) => instance.defaults.headers.common['Authorization'] = token;

export default instance;