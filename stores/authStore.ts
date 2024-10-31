import type { IUser } from "~/interfaces/IUser";

interface AuthState {
    token: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({ token: null }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token: string) {
            this.token = token;
        },
        logout() {
            this.token = null;
        },
    },
})