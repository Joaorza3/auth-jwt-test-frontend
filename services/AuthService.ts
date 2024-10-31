import axios, { setAxiosAuthToken } from "~/libs/axios";

export class AuthService {
    static async register(username: string, email: string, password: string) {
        await axios('/auth/create', {
            method: 'POST',
            data: { username, email, password },
        });
    }

    static async login(email: string, password: string) {
        const { data } = await axios('/auth/login', {
            method: 'POST',
            data: { email, password },
        });
        setAuthToken(data.token);
        setAxiosAuthToken(data.token);
    }

    static async validateToken() {
        const { data } = await axios('/auth/validate');
        return data;
    }

    static async logout() {
        await axios('/auth/logout');
        setAuthToken('');
        setAxiosAuthToken('');
    }
}