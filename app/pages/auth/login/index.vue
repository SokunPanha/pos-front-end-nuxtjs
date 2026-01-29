<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
}
</script>

<template>
    <main class=" flex h-screen justify-center w-full items-center">
        <div class=" max-w-[500px] w-100  p-10">
            <h1 class="text-center text-2xl font-bold mb-3">Authentication</h1>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Email" name="email">
                    <UInput class="w-full" v-model="state.email" />
                </UFormField>

                <UFormField label="Password" name="password">
                    <UInput class="w-full"  v-model="state.password" type="password" />
                </UFormField>

               <div class="flex justify-center">
                 <UButton class="w-full flex justify-center " type="submit">
                   <span class="text-white">Login</span>
                </UButton>
               </div>
            </UForm>
        </div>
    </main>
</template>
