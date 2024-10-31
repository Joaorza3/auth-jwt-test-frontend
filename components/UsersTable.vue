<script lang="ts" setup>
import type { IUser } from '~/interfaces/IUser';
import { UserService } from '~/services/UserService';

const users = ref<IUser[]>([])

const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'username',
    label: 'User name'
}, {
    key: 'email',
    label: 'Email'
}]

onMounted(async () => {
    const { users: data } = await UserService.findAll()
    users.value = data
})

</script>

<template>
    <div class="mt-6">
        <h2 class="text-2xl font-bold">Usuários</h2>
        <UTable :rows="users" :columns="columns" />
    </div>
</template>