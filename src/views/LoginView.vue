<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import InputText from '@/components/InputText.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEmail, mdiLock, mdiLogin, mdiAlertCircle, mdiCheckCircle } from '@mdi/js'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { isAxiosError, type AxiosError } from 'axios'
import { ERROR_MESSAGES, HTTP_STATUS, ROUTE_NAMES } from '@/config/constants'

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  console.log('Form values:', values)

  // 步骤 4.5 & 5.4: 使用 .then().catch() 处理登录，并使用 message store
  authStore.login(values.email, values.password)
    .then(() => {
      console.log('login success')
      // Navigate to events page after successful login
      router.push({ name: ROUTE_NAMES.EVENT_LIST })
    })
    .catch((err: unknown) => {
      console.error('Login error:', err)

      let errorMessage = ''

      // 改进错误处理，确保用户看到友好的错误信息
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError

        // 如果 authStore 没有设置错误消息，提供友好的提示
        if (!authStore.error) {
          if (axiosError.code === 'ERR_NETWORK' || axiosError.code === 'ECONNABORTED') {
            errorMessage = ERROR_MESSAGES.NETWORK_ERROR
          } else if (axiosError.response?.status === HTTP_STATUS.UNAUTHORIZED) {
            errorMessage = ERROR_MESSAGES.UNAUTHORIZED
          } else if (axiosError.response?.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
            errorMessage = ERROR_MESSAGES.RATE_LIMIT
          } else if (axiosError.response?.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
            errorMessage = ERROR_MESSAGES.SERVER_ERROR
          } else {
            errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR
          }
          authStore.error = errorMessage
        } else {
          errorMessage = authStore.error
        }
      } else {
        // 非 Axios 错误
        if (!authStore.error) {
          errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR
          authStore.error = errorMessage
        } else {
          errorMessage = authStore.error
        }
      }

      // 步骤 5.4: 使用 message store 显示错误消息
      messageStore.updateMessage(errorMessage || 'Could not login')

      // 3秒后自动清除消息
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <div class="w-full max-w-md">
      <!-- Card Container with shadow and border -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header with gradient background -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <SvgIcon type="mdi" :path="mdiLogin" :size="32" class="text-indigo-600" />
          </div>
          <h2 class="text-3xl font-bold text-white">Welcome Back</h2>
          <p class="mt-2 text-indigo-100">Sign in to your account</p>
        </div>

        <!-- Form Container -->
        <div class="px-8 py-8">
          <form class="space-y-6" @submit.prevent="onSubmit">
            <!-- Email Input with Icon -->
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

            <!-- Password Input with Icon -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                  Forgot password?
                </a>
              </div>
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

            <!-- Submit Button with Icon -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="authStore.loading"
                class="group relative w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                <SvgIcon type="mdi" :path="mdiLogin" :size="20" />
                <span>{{ authStore.loading ? 'Signing in...' : 'Sign in' }}</span>
              </button>
            </div>

            <!-- Error Display with Icon -->
            <div
              v-if="authStore.error"
              class="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake"
            >
              <SvgIcon type="mdi" :path="mdiAlertCircle" :size="20" class="text-red-600 flex-shrink-0 mt-0.5" />
              <p class="text-sm text-red-800 flex-1">{{ authStore.error }}</p>
            </div>

            <!-- Success Message (optional, if needed) -->
            <div
              v-if="messageStore.message && !authStore.error"
              class="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <SvgIcon type="mdi" :path="mdiCheckCircle" :size="20" class="text-green-600 flex-shrink-0 mt-0.5" />
              <p class="text-sm text-green-800 flex-1">{{ messageStore.message }}</p>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <p class="text-center text-sm text-gray-600">
            Not a member?
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors ml-1">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <p class="mt-6 text-center text-xs text-gray-500">
        Protected by industry-standard encryption
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
