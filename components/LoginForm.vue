<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const emmiter = defineEmits(['submit'])

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emmiter('submit', event.data)
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4 mt-6" @submit="onSubmit" method="POST">
        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div class="flex gap-2 items-center">
            <UButton type="submit">
                Entrar
            </UButton>

            <nuxt-link to="/auth/register">
                <UButton type="button" color="white">
                    Criar Conta
                </UButton>
            </nuxt-link>
        </div>
    </UForm>
</template>
