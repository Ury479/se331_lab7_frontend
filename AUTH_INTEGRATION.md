# 🔐 认证系统集成说明

## 📁 文件结构

```
src/
├── stores/
│   └── auth.ts          ✨ 新增：Pinia 认证状态管理
├── api/
│   ├── auth.ts          ✅ 更新：简化的认证 API 函数
│   └── http.ts          ✅ 更新：使用环境变量的 Axios 实例
└── views/
    └── LoginView.vue    ✅ 更新：使用 auth store
```

---

## 🎯 核心功能

### 1. **Auth Store** (`src/stores/auth.ts`)

使用 Pinia 管理认证状态，提供集中式的登录/登出功能。

**特性：**
- ✅ 状态管理：token、refreshToken、loading、error
- ✅ 自动持久化到 localStorage
- ✅ 提供 `isAuthenticated` getter
- ✅ 包含 `initialize()` 方法用于应用启动时恢复状态

**使用方法：**

```typescript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 登录
await authStore.login('username', 'password')

// 检查是否已登录
if (authStore.isAuthenticated) {
  // 用户已登录
}

// 登出
authStore.logout()

// 初始化（在 main.ts 中调用）
authStore.initialize()
```

---

### 2. **Auth API** (`src/api/auth.ts`)

提供简单的函数式 API 调用，保留向后兼容性。

**推荐：** 优先使用 `useAuthStore()`，除非需要直接的 API 调用。

```typescript
import { login, logout } from '@/api/auth'

// 直接 API 调用（不使用 store）
const response = await login({ username: 'user', password: 'pass' })
console.log(response.accessToken)

// 登出
await logout()
```

---

### 3. **HTTP Client** (`src/api/http.ts`)

统一的 Axios 实例，自动：
- ✅ 使用环境变量配置 baseURL
- ✅ 自动附加 Authorization header（从 localStorage 读取）

```typescript
import http from '@/api/http'

// 所有请求都会自动带上 token
const response = await http.get('/api/events')
```

---

### 4. **登录页面** (`src/views/LoginView.vue`)

集成了：
- ✅ VeeValidate 表单验证
- ✅ Yup 验证规则
- ✅ Auth Store 状态管理
- ✅ 加载状态显示
- ✅ 错误提示

---

## 🚀 快速开始

### 1. 在 `main.ts` 中初始化 auth store

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化认证状态
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
```

### 2. 在组件中使用

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value)
    // 登录成功
  } catch (error) {
    // 错误已自动存储在 authStore.error
    console.error(authStore.error)
  }
}
</script>

<template>
  <button @click="handleLogin" :disabled="authStore.loading">
    {{ authStore.loading ? 'Loading...' : 'Login' }}
  </button>
  <p v-if="authStore.error">{{ authStore.error }}</p>
</template>
```

---

## 🔒 路由守卫（可选）

在 `router/index.ts` 中添加认证守卫：

```typescript
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 需要认证的路由
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
```

在路由定义中标记需要认证的页面：

```typescript
{
  path: '/events',
  name: 'event-list-view',
  component: EventListView,
  meta: { requiresAuth: true }  // 需要登录
}
```

---

## 🌍 环境变量配置

在 `.env.development` 中配置：

```env
VITE_BACKEND_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080
```

---

## ✅ 避免的功能重复

### 之前的问题：
- ❌ 多个地方创建 axios 实例
- ❌ 登录逻辑分散在组件中
- ❌ 硬编码的 baseURL

### 现在的解决方案：
- ✅ 统一的 `http` 客户端（`src/api/http.ts`）
- ✅ 集中的认证逻辑（`src/stores/auth.ts`）
- ✅ 环境变量配置 baseURL
- ✅ 向后兼容的 API 函数（`src/api/auth.ts`）

---

## 📝 测试步骤

1. **访问登录页面**：`http://localhost:5173/login`

2. **测试表单验证**（步骤 3.7）：
   - 空字段验证
   - 邮箱格式验证
   - 密码长度验证（至少 6 位）

3. **测试成功登录**（步骤 3.8）：
   - 输入有效的邮箱和密码
   - 打开浏览器控制台
   - 点击 "Sign in"
   - 查看控制台输出的表单数据

4. **测试 Store 功能**：
   ```javascript
   // 在浏览器控制台中
   import { useAuthStore } from '@/stores/auth'
   const authStore = useAuthStore()
   console.log(authStore.isAuthenticated)
   console.log(authStore.token)
   ```

---

## 🎉 总结

现在你有一个完整的、无重复的认证系统：

- 📦 **Pinia Store**：集中管理认证状态
- 🔧 **HTTP Client**：统一的 API 调用
- 🎨 **LoginView**：集成验证和状态管理
- 🔄 **向后兼容**：保留简单的函数式 API

**推荐使用顺序：**
1. 优先使用 `useAuthStore()` - 状态管理
2. 其次使用 `login()` 函数 - 简单 API 调用
3. 最后使用 `http` 客户端 - 自定义请求

