<script lang="ts" setup>
import { AuthService } from '~/services/AuthService';

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const handleLogout = async () => {
    try {
        await AuthService.logout()

        authStore.logout()
        router.push('/auth/login')

        toast.add({
            color: 'green',
            title: 'Sucesso',
            description: 'Logout efetuado com sucesso'
        })
    } catch (error: any) {
        toast.add({
            color: 'red',
            title: 'Erro',
            description: 'Erro ao efetuar logout'
        })
    }
}
</script>


<template>
    <div>
        <div class="flex flex-col">
            <div class="flex items-end justify-between">
                <h1 class="text-3xl md:text-4xl font-bold">Desafio técnico</h1>
                <UTooltip text="Sair">
                    <UButton icon="i-heroicons-arrow-right-on-rectangle" class="h-fit w-fit" @click="handleLogout" />
                </UTooltip>
            </div>
            <p class="text-xl">Sistema de autenticação <span class="font-bold text-primary">JWT</span></p>
        </div>

        <UsersTable />
    </div>
</template>