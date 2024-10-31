import type { IUser } from "~/interfaces/IUser";
import axios from "~/libs/axios";

export class UserService {
    static async findAll(): Promise<{ users: IUser[] }> {
        const { data } = await axios('/users')
        return data;
    }
}