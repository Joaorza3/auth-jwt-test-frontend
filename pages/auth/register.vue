<script lang="ts" setup>
import { AuthService } from '~/services/AuthService';

const router = useRouter()
const toast = useToast()

const authStore = useAuthStore()

const handleRegister = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    try {
        await AuthService.register(username, email, password)
        await AuthService.login(email, password)

        authStore.login(getAuthToken() as string)
        router.push('/')

        toast.add({
            color: 'green',
            title: 'Sucesso',
            description: 'Login efetuado com sucesso'
        })
    } catch (error: any) {
        if (error.response?.data?.error?.includes('Duplicate entry')) {
            error.message = 'Usuário já cadastrado'
        }

        toast.add({
            color: 'red',
            title: 'Erro',
            description: 'Erro ao cadastrar usuário'
        })
    }
}
</script>

<template>
    <div>
        <h1 class="text-3xl md:text-4xl font-bold">Seja bem-vindo(a)!</h1>
        <p class="text-xl">Faça <span class="font-bold text-primary">login</span> para acessar o sistema</p>

        <RegisterForm @submit="handleRegister" />
    </div>
</template>