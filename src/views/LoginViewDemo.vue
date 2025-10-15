<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

const router = useRouter()
const authStore = useAuthStore()

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

// 常量配置
const REDIRECT_DELAY_MS = 2000

const onSubmit = handleSubmit(async (values) => {
  console.log('Form values:', values)

  // 🎓 临时演示模式：模拟登录成功（仅用于学习步骤 4.3）
  // 生成模拟的 JWT tokens
  const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoiJyArIHZhbHVlcy5lbWFpbCArICciLCJpYXQiOjE3MzQyMDAwMDB9.demo-signature'
  const mockRefreshToken = 'refresh-token-demo-' + Date.now()

  console.log('🎓 演示模式：模拟登录成功')

  // 仅在开发环境显示完整 token
  if (import.meta.env.DEV) {
    console.log('Mock Access Token:', mockAccessToken)
    console.log('Mock Refresh Token:', mockRefreshToken)
  } else {
    console.log('Token 已生成（长度:', mockAccessToken.length, '字符）')
  }

  // 使用 $patch 方法正确更新 Pinia store 的状态
  authStore.$patch({
    token: mockAccessToken,
    refreshToken: mockRefreshToken,
    loading: false,
    error: ''
  })

  // 保存到 localStorage
  localStorage.setItem('accessToken', mockAccessToken)
  localStorage.setItem('refreshToken', mockRefreshToken)

  console.log('✅ 登录成功！Token 已保存到 Pinia Store')
  console.log('🔍 请在 Vue DevTools → Pinia → auth store 中查看')

  // 仅在开发环境显示完整 token
  if (import.meta.env.DEV) {
    console.log('📦 Store State:', {
      token: authStore.token,
      refreshToken: authStore.refreshToken
    })
  } else {
    console.log('📦 Token 已保存（已隐藏敏感信息）')
  }

  // 延迟跳转，给时间查看控制台和 DevTools
  setTimeout(() => {
    console.log(`⏰ ${REDIRECT_DELAY_MS / 1000}秒后自动跳转到 Events 页面...`)
    router.push({ name: 'event-list-view' })
  }, REDIRECT_DELAY_MS)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
        <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-sm text-amber-600">🎓 演示模式 - 用于学习步骤 4.3</p>
      </div>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <InputText type="text" v-model="email" placeholder="任意文本" :error="errors['email']" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <InputText type="password" v-model="password" placeholder="任意文本" :error="errors['password']" />
          </div>
        </div>

        <div>
          <button type="submit"
                  :disabled="authStore.loading"
                  class="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-50 disabled:cursor-not-allowed">
            {{ authStore.loading ? 'Signing in...' : '🎓 演示登录（模拟成功）' }}
          </button>
        </div>

        <div class="rounded-md bg-blue-50 p-4">
          <div class="flex">
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-blue-700">
                <strong>学习提示：</strong>输入任意非空文本即可模拟登录成功，然后在 Vue DevTools 中查看 token。
              </p>
            </div>
          </div>
        </div>

        <!-- Display auth store error if any -->
        <p v-if="authStore.error" class="text-center text-sm text-red-600">
          {{ authStore.error }}
        </p>
      </form>
    </div>
  </div>
</template>

