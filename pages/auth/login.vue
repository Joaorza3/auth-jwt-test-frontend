<script lang="ts" setup>
import { AuthService } from '~/services/AuthService';

const router = useRouter()
const toast = useToast()

const authStore = useAuthStore()

const handleLogin = async ({ email, password }: { email: string, password: string }) => {
    try {
        await AuthService.login(email, password)

        authStore.login(getAuthToken() as string)
        router.push('/')

        toast.add({
            color: 'green',
            title: 'Sucesso',
            description: 'Login efetuado com sucesso'
        })
    } catch (error: any) {
        toast.add({
            color: 'red',
            title: 'Erro',
            description: 'Erro ao efetuar login'
        })
    }
}
</script>

<template>
    <div>
        <h1 class="text-3xl md:text-4xl font-bold">Autenticação</h1>        
         <p class="text-xl">Faça <span class="font-bold text-primary">login</span> para acessar o sistema</p>

        <LoginForm @submit="handleLogin" />
    </div>
</template>