<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'auth-layout'
})

const { t } = useI18n()

const schema = computed(() => z.object({
    email: z.email(t('label.invalidEmail')),
    password: z.string({ message: t('label.passwordRequired') }).min(8, t('label.passwordMinLength'))
}))

type Schema = { email: string; password: string }

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(_event: FormSubmitEvent<Schema>) {
    toast.add({ title: t('label.success'), description: t('label.formSubmitted'), color: 'success' })
}
</script>

<template>
    <main class=" flex h-screen justify-center w-full items-center">
        <div class=" max-w-[500px] w-100  p-10">
            <h1 class="text-center text-2xl font-bold mb-3">{{ $t('label.authentication') }}</h1>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField :label="$t('label.email')" name="email">
                    <UInput class="w-full" v-model="state.email" />
                </UFormField>

                <UFormField :label="$t('label.password')" name="password">
                    <UInput class="w-full"  v-model="state.password" type="password" />
                </UFormField>

               <div class="flex justify-center">
                 <UButton class="w-full flex justify-center " type="submit">
                   <span class="text-white">{{ $t('label.login') }}</span>
                </UButton>
               </div>
            </UForm>
        </div>
    </main>
</template>
