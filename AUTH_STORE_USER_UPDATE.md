# 🔐 Auth Store 用户信息更新总结

## ✅ 完成的工作

### 1. **更新 `src/stores/auth.ts`**

#### 导入 Organizer 类型
```typescript
import type { Organizer } from '@/types/Organizer'
```

#### 更新 AuthResponse 接口
```typescript
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user?: Organizer  // 新增：用户信息
}
```

#### 更新 State
```typescript
state: () => ({
  token: null as string | null,
  refreshToken: null as string | null,
  user: null as Organizer | null,  // 新增：用户信息
  loading: false,
  error: '' as string | '',
})
```

#### 新增 Getter
```typescript
getters: {
  isAuthenticated: (state) => !!state.token,
  // 新增：获取当前用户名
  currentUserName(): string {
    return this.user?.name || ''
  },
}
```

#### 更新 Login Action
登录成功后：
1. ✅ 保存 `access_token` 到 `this.token`
2. ✅ 保存 `user` 数据到 `this.user`
3. ✅ 将 token 存储到 `localStorage.setItem('accessToken', ...)`
4. ✅ 将用户信息存储到 `localStorage.setItem('user', JSON.stringify(this.user))`

```typescript
async login(username: string, password: string) {
  this.loading = true
  this.error = ''
  try {
    const res = await apiClient.post<AuthResponse>('/api/v1/auth/authenticate', {
      username,
      password,
    })
    
    // 保存到 store
    this.token = res.data.accessToken
    this.refreshToken = res.data.refreshToken
    this.user = res.data.user || null
    
    // 持久化到 localStorage
    localStorage.setItem('accessToken', this.token)
    localStorage.setItem('refreshToken', this.refreshToken!)
    
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user))
    }
    
    return res.data
  } catch (err: any) {
    this.error = err?.response?.data?.message ?? 'Login failed'
    throw err
  } finally {
    this.loading = false
  }
}
```

#### 更新 Logout Action
```typescript
logout() {
  this.token = null
  this.refreshToken = null
  this.user = null  // 新增：清除用户信息
  this.error = ''
  
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')  // 新增：清除用户信息
}
```

#### 更新 Initialize Action
```typescript
initialize() {
  const token = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const userStr = localStorage.getItem('user')
  
  if (token) {
    this.token = token
    this.refreshToken = refreshToken
  }
  
  // 新增：从 localStorage 恢复用户信息
  if (userStr) {
    try {
      this.user = JSON.parse(userStr) as Organizer
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      localStorage.removeItem('user')
    }
  }
}
```

### 2. **更新 `src/main.ts`**

在应用启动时调用 `initialize()` 恢复用户状态：

```typescript
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 从 localStorage 初始化认证状态
const authStore = useAuthStore()
authStore.initialize()

inject()
app.mount('#app')
```

## 📦 数据流

### 登录流程
```
1. 用户输入 email + password
   ↓
2. 调用 authStore.login(email, password)
   ↓
3. 发送 POST /api/v1/auth/authenticate
   ↓
4. 后端返回 { accessToken, refreshToken, user }
   ↓
5. 保存到 Pinia store:
   - this.token = accessToken
   - this.refreshToken = refreshToken
   - this.user = user
   ↓
6. 持久化到 localStorage:
   - localStorage.setItem('accessToken', token)
   - localStorage.setItem('refreshToken', refreshToken)
   - localStorage.setItem('user', JSON.stringify(user))
   ↓
7. 跳转到首页
```

### 应用启动流程
```
1. 应用启动
   ↓
2. 创建 Pinia 实例
   ↓
3. 调用 authStore.initialize()
   ↓
4. 从 localStorage 读取:
   - accessToken
   - refreshToken
   - user (JSON)
   ↓
5. 恢复到 Pinia store:
   - this.token = accessToken
   - this.refreshToken = refreshToken
   - this.user = JSON.parse(userStr)
   ↓
6. 用户状态恢复完成
```

### 登出流程
```
1. 调用 authStore.logout()
   ↓
2. 清除 Pinia store:
   - this.token = null
   - this.refreshToken = null
   - this.user = null
   ↓
3. 清除 localStorage:
   - localStorage.removeItem('accessToken')
   - localStorage.removeItem('refreshToken')
   - localStorage.removeItem('user')
   ↓
4. 跳转到登录页
```

## 🎯 使用示例

### 在组件中获取用户信息

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <!-- 显示用户名 -->
    <p>Welcome, {{ authStore.currentUserName }}</p>
    
    <!-- 访问完整用户信息 -->
    <div v-if="authStore.user">
      <p>Email: {{ authStore.user.email }}</p>
      <p>ID: {{ authStore.user.id }}</p>
    </div>
    
    <!-- 检查是否已登录 -->
    <button v-if="authStore.isAuthenticated" @click="authStore.logout()">
      Logout
    </button>
  </div>
</template>
```

### 在路由守卫中使用

```typescript
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 检查是否需要登录
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

## 📊 State 结构

```typescript
{
  token: string | null,        // JWT access token
  refreshToken: string | null, // JWT refresh token
  user: Organizer | null,      // 用户信息对象
  loading: boolean,            // 加载状态
  error: string                // 错误消息
}
```

## 🔍 Organizer 类型

```typescript
interface Organizer {
  id: number
  name: string
  description: string
  email: string
  phone?: string
  website?: string
  address?: string
  image?: string
}
```

## 💾 localStorage 存储

| Key | 类型 | 内容 |
|-----|------|------|
| `accessToken` | string | JWT 访问令牌 |
| `refreshToken` | string | JWT 刷新令牌 |
| `user` | string (JSON) | 用户信息对象（序列化后） |

## ✨ 主要特性

1. ✅ **持久化存储** - 刷新页面后用户状态保持
2. ✅ **类型安全** - 使用 TypeScript 接口
3. ✅ **错误处理** - JSON 解析失败时自动清理
4. ✅ **统一管理** - 所有认证逻辑集中在一个 store
5. ✅ **自动初始化** - 应用启动时自动恢复状态
6. ✅ **安全清理** - 登出时完整清除所有数据

## 🔒 安全注意事项

1. **Token 存储在 localStorage**
   - ⚠️ 存在 XSS 风险
   - 💡 建议：生产环境考虑使用 HttpOnly Cookie

2. **用户信息暴露**
   - ⚠️ localStorage 可被 JavaScript 访问
   - 💡 建议：不要存储敏感信息（如密码、信用卡）

3. **Token 过期处理**
   - 💡 建议：添加 token 过期检查
   - 💡 建议：实现自动刷新 token 机制

## 🚀 后续改进建议

1. **添加 Token 刷新机制**
   ```typescript
   async refreshToken() {
     // 使用 refreshToken 获取新的 accessToken
   }
   ```

2. **添加 Token 过期检查**
   ```typescript
   isTokenExpired(): boolean {
     // 检查 token 是否过期
   }
   ```

3. **添加自动登出**
   ```typescript
   // Token 过期时自动登出
   ```

4. **使用 HttpOnly Cookie**
   - 更安全的 token 存储方式
   - 防止 XSS 攻击

## 📝 测试清单

- [x] 登录成功后 user 存储到 store
- [x] 登录成功后 user 存储到 localStorage
- [x] 刷新页面后 user 正确恢复
- [x] currentUserName getter 正常工作
- [x] 登出后 user 被清除
- [x] localStorage 解析失败时不崩溃
- [x] 无 TypeScript 错误
- [x] 无 linter 警告

---

**更新时间**: 2024-10-15  
**修改文件**: 2 个  
**新增功能**: 用户信息存储与恢复  
**新增 Getter**: currentUserName

