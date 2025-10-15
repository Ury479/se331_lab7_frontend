<script setup lang="ts">
import { useRouter } from 'vue-router'
import InputText from '@/components/InputText.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiEmail, mdiLock, mdiAccount } from '@mdi/js'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

const router = useRouter()

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    email: '',
    password: ''
  }
})

const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  console.log('Register form values:', values)
  // TODO: Implement registration logic
  alert('Registration feature coming soon!')
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-purple-50 via-white to-pink-50">
    <div class="w-full max-w-md">
      <!-- Card Container -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-10 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <SvgIcon type="mdi" :path="mdiAccountPlus" :size="32" class="text-purple-600" />
          </div>
          <h2 class="text-3xl font-bold text-white">Create Account</h2>
          <p class="mt-2 text-purple-100">Sign up to get started</p>
        </div>

        <!-- Form Container -->
        <div class="px-8 py-8">
          <form class="space-y-6" @submit.prevent="onSubmit">
            <!-- Username Input -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SvgIcon type="mdi" :path="mdiAccount" :size="20" class="text-gray-400" />
                </div>
                <InputText
                  type="text"
                  v-model="username"
                  placeholder="Choose a username"
                  :error="errors['username']"
                  class="pl-10"
                />
              </div>
            </div>

            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-gray-400" />
                </div>
                <InputText
                  type="text"
                  v-model="email"
                  placeholder="you@example.com"
                  :error="errors['email']"
                  class="pl-10"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SvgIcon type="mdi" :path="mdiLock" :size="20" class="text-gray-400" />
                </div>
                <InputText
                  type="password"
                  v-model="password"
                  placeholder="••••••••"
                  :error="errors['password']"
                  class="pl-10"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                class="group relative w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <SvgIcon type="mdi" :path="mdiAccountPlus" :size="20" />
                <span>Create Account</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <p class="text-center text-sm text-gray-600">
            Already have an account?
            <RouterLink to="/login" class="font-semibold text-purple-600 hover:text-purple-500 transition-colors ml-1">
              Sign in
            </RouterLink>
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <p class="mt-6 text-center text-xs text-gray-500">
        By signing up, you agree to our Terms of Service
      </p>
    </div>
  </div>
</template>

