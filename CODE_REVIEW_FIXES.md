# 🔍 代码审查与修复建议

## ✅ 已修复的问题

1. **EventService.ts** - 添加了缺失的 `apiClient` 导入

---

## ⚠️ 需要立即修复的问题

### 1. 清理重复文件

#### 删除或合并以下文件：

**选项 A：使用新版本（推荐）**
```bash
# 删除旧文件
rm src/services/AxiosInterceptorSetup.ts  # 功能与 AxiosClient 重复
rm src/services/EventService.ts           # 使用 EventServices.ts 代替
rm src/views/LoginViewSimple.vue          # 未使用的文件
```

**选项 B：统一到一个系统**
- 决定使用 `AxiosClient.ts` 还是 `AxiosInterceptorSetup.ts`
- 删除另一个并更新所有导入

---

### 2. 修复 EventService.ts 的 baseURL 问题

```typescript
// ❌ 当前代码
const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
console.log('EventService baseURL:', baseURL)
// baseURL 未使用

// ✅ 应该删除或使用
// 删除这两行，因为 apiClient 已经配置了 baseURL
```

---

### 3. 安全加固

#### A. 保护生产环境的日志

```typescript
// LoginViewDemo.vue
if (import.meta.env.DEV) {
  console.log('Mock Access Token:', mockAccessToken)
  console.log('Mock Refresh Token:', mockRefreshToken)
}
```

#### B. 添加 token 过期检查

```typescript
// 在 auth store 中添加
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}
```

#### C. 添加 CSRF token（如果需要）

```typescript
// AxiosClient.ts
apiClient.defaults.xsrfCookieName = 'XSRF-TOKEN'
apiClient.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
```

---

### 4. 改进错误处理

#### LoginView.vue

```typescript
.catch((err) => {
  console.log('error', err)
  // ✅ 添加用户友好的错误提示
  if (err.response?.status === 401) {
    // authStore.error 已经设置，无需重复
  } else if (err.code === 'ERR_NETWORK') {
    alert('网络错误，请检查连接')
  } else {
    alert('登录失败，请重试')
  }
})
```

---

### 5. 配置常量提取

#### 创建 `src/config/constants.ts`

```typescript
export const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  TIMEOUT: 15000,
} as const

export const AUTH_PATHS = {
  LOGIN: '/api/v1/auth/authenticate',
  REFRESH: '/api/v1/auth/refresh-token',
  LOGOUT: '/api/v1/auth/logout',
} as const
```

---

## 📊 优先级排序

### 🔴 高优先级（立即修复）

1. ✅ **已修复** - EventService.ts 添加 apiClient 导入
2. ⚠️ **立即处理** - 删除重复的拦截器配置
3. ⚠️ **立即处理** - 统一使用 EventServices.ts 或 EventService.ts

### 🟡 中优先级（本周内）

4. 添加生产环境日志保护
5. 改进错误处理和用户反馈
6. 删除未使用的 LoginViewSimple.vue

### 🟢 低优先级（优化项）

7. 统一代码风格（分号使用）
8. 提取配置常量
9. 添加 token 过期检查
10. 考虑更安全的 token 存储方案

---

## 🎯 推荐的文件结构

```
src/
├── api/
│   ├── auth.ts              ✅ 认证相关 API
│   └── http.ts              ✅ 基础 HTTP 配置（简化版）
├── services/
│   ├── AxiosClient.ts       ✅ 保留，带拦截器
│   ├── EventServices.ts     ✅ 保留，使用 AxiosClient
│   └── OrganizerService.ts  ✅ 保留
├── config/
│   └── constants.ts         🆕 添加，存放配置常量
├── stores/
│   └── auth.ts              ✅ 保留
└── views/
    ├── LoginView.vue        ✅ 主登录页
    └── LoginViewDemo.vue    🎓 演示用（可选）
```

---

## 🔒 安全检查清单

- [ ] Token 存储在 localStorage（考虑升级到 HttpOnly cookies）
- [ ] 生产环境不输出敏感日志
- [ ] 添加 CSRF 保护（如果需要）
- [ ] Token 自动刷新机制已实现 ✅
- [ ] 401 错误自动重试已实现 ✅
- [ ] 请求队列防止重复刷新 ✅
- [ ] 添加 token 过期检查
- [ ] 考虑添加请求签名

---

## 📝 立即执行的命令

```bash
# 1. 删除重复和未使用的文件
rm src/services/AxiosInterceptorSetup.ts
rm src/views/LoginViewSimple.vue

# 2. 如果决定使用 EventServices.ts
rm src/services/EventService.ts
# 并更新所有导入：
# 从 '@/services/EventService' 改为 '@/services/EventServices'

# 3. 创建配置文件
mkdir -p src/config
touch src/config/constants.ts
```

---

## 🎓 学习建议

1. **关于 Token 存储**
   - 阅读：OWASP Token Storage Best Practices
   - 了解 XSS 和 CSRF 攻击

2. **关于拦截器**
   - 只保留一套拦截器系统
   - 理解 request/response 拦截器的执行顺序

3. **关于错误处理**
   - 添加全局错误处理器
   - 区分不同类型的错误

---

## ✅ 验证步骤

修复后请验证：

1. 登录功能正常
2. Token 刷新正常
3. 401 错误自动重试
4. 控制台无错误
5. 生产构建成功：`npm run build`
6. 类型检查通过：`npm run type-check`

