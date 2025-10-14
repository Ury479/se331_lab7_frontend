<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import InputText from '@/components/InputText.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  // Basic guard
  if (!email.value || !password.value) {
    errorMsg.value = 'Please fill email and password.'
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    const data = await login({ username: email.value, password: password.value })
    // Persist tokens for subsequent requests
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    // Navigate to a protected page, e.g., events
    router.push({ name: 'event-list-view' })
  } catch (err: any) {
    // Show a friendly message
    errorMsg.value = err?.response?.data?.message || 'Login failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
        <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <InputText type="email" v-model="email" placeholder="Email address" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <InputText type="password" v-model="password" placeholder="Password" />
          </div>
        </div>

        <div>
          <button type="submit"
                  :disabled="loading"
                  @click.prevent="onSubmit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60">
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <p v-if="errorMsg" class="text-center text-sm text-red-600">{{ errorMsg }}</p>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </form>
    </div>
  </div>
</template>
