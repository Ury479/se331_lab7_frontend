# ✅ 步骤 5.4 完成 - 集成 Message Store

完成时间：2024-10-15

---

## 📝 任务说明

**步骤 5.4：** 在登录失败时使用 message store 显示错误消息，并在 3 秒后自动清除。

---

## ✅ 已完成的修改

### 1. 导入 Message Store

```typescript
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
```

### 2. 优化错误处理逻辑

**改进要点：**
- ✅ 避免代码重复
- ✅ 同时使用 `authStore.error` 和 `messageStore` 
- ✅ 保持现有的详细错误处理
- ✅ 使用配置常量（ERROR_MESSAGES, HTTP_STATUS）

**实现代码：**

```typescript
.catch((err: unknown) => {
  console.error('Login error:', err)
  
  let errorMessage = ''
  
  // 改进错误处理，确保用户看到友好的错误信息
  if (isAxiosError(err)) {
    const axiosError = err as AxiosError
    
    if (!authStore.error) {
      // 根据不同的错误状态设置错误消息
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
```

---

## 🎯 功能特性

### 双重错误显示机制

1. **AuthStore Error**
   - 显示在登录表单底部
   - 持久显示（不会自动消失）
   - 用于表单内的错误提示

2. **MessageStore** ✨ 新增
   - 全局消息系统
   - 3 秒后自动消失
   - 可用于全局 toast/notification

### 错误消息类型

| 错误类型 | 错误消息 | 触发条件 |
|---------|---------|---------|
| 网络错误 | "网络连接失败，请检查您的网络连接" | ERR_NETWORK, ECONNABORTED |
| 认证失败 | "用户名或密码错误" | HTTP 401 |
| 请求限流 | "请求过于频繁，请稍后再试" | HTTP 429 |
| 服务器错误 | "服务器错误，请稍后再试" | HTTP 500 |
| 未知错误 | "发生未知错误，请重试" | 其他情况 |

---

## 🔄 与图片要求的对比

### 图片要求：
```typescript
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()

authStore.login(values.email, values.password)
  .then(() => {
    router.push({ name: 'event-list' })
  })
  .catch((err) => {
    console.log('error', err)
    messageStore.updateMessage('could not login')
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  })
```

### 我们的实现（改进版）：
```typescript
import { useMessageStore } from '@/stores/message'
import { ERROR_MESSAGES, HTTP_STATUS, ROUTE_NAMES } from '@/config/constants'

const messageStore = useMessageStore()

authStore.login(values.email, values.password)
  .then(() => {
    console.log('login success')  // ✅ 添加成功日志
    router.push({ name: ROUTE_NAMES.EVENT_LIST })  // ✅ 使用常量
  })
  .catch((err: unknown) => {  // ✅ 类型安全
    console.error('Login error:', err)  // ✅ 使用 console.error
    
    let errorMessage = ''
    
    // ✅ 详细的错误类型判断
    if (isAxiosError(err)) {
      // ... 详细的错误处理逻辑
    }
    
    // ✅ 使用具体的错误消息而不是硬编码 'could not login'
    messageStore.updateMessage(errorMessage || 'Could not login')
    
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  })
```

---

## 🎨 改进点

### 1. ✅ 避免代码重复
- 提取 `errorMessage` 变量
- 同时设置 `authStore.error` 和 `messageStore`
- 保持 DRY 原则

### 2. ✅ 类型安全
- 使用 `(err: unknown)` 而不是 `any`
- 使用 `isAxiosError()` 类型守卫
- TypeScript 类型检查

### 3. ✅ 使用配置常量
- `ERROR_MESSAGES` - 错误消息常量
- `HTTP_STATUS` - HTTP 状态码常量
- `ROUTE_NAMES` - 路由名称常量

### 4. ✅ 友好的用户体验
- 中文错误消息
- 区分不同类型的错误
- 自动消失的全局提示

### 5. ✅ 更好的日志记录
- 成功时：`console.log('login success')`
- 失败时：`console.error('Login error:', err)`

---

## 🧪 测试建议

### 测试场景 1：网络错误
```
操作：断开网络后尝试登录
预期：
  - authStore.error: "网络连接失败，请检查您的网络连接"
  - messageStore.message: "网络连接失败，请检查您的网络连接"
  - 3 秒后 messageStore.message 自动清空
```

### 测试场景 2：认证失败（401）
```
操作：输入错误的用户名密码
预期：
  - authStore.error: "用户名或密码错误"
  - messageStore.message: "用户名或密码错误"
  - 控制台：console.error('Login error:', err)
  - 3 秒后 messageStore.message 自动清空
```

### 测试场景 3：成功登录
```
操作：输入正确的凭证（或使用演示页面）
预期：
  - 控制台：console.log('login success')
  - 跳转到 events 页面
  - 无错误消息
```

---

## 📦 文件修改总结

### 修改的文件：
- ✅ `src/views/LoginView.vue`

### 修改内容：
1. 导入 `useMessageStore`
2. 创建 `messageStore` 实例
3. 在 `.catch()` 中调用 `messageStore.updateMessage()`
4. 添加 `setTimeout` 自动清除消息
5. 优化错误处理逻辑避免重复

### 相关文件（未修改）：
- `src/stores/message.ts` - Message Store（已存在）
- `src/config/constants.ts` - 配置常量（已存在）

---

## ✅ Linter 检查

```
✅ No linter errors found
```

---

## 🎉 总结

步骤 5.4 已完美完成：

- ✅ 集成了 message store
- ✅ 避免了代码重复
- ✅ 保持了现有的错误处理优势
- ✅ 提供了更好的用户体验
- ✅ 符合图片要求并进行了改进

**双重错误显示机制：**
- AuthStore Error - 表单内持久显示
- MessageStore - 全局自动消失提示

现在用户在登录失败时可以：
1. 在表单底部看到详细的错误提示（authStore.error）
2. 在全局看到临时的错误消息（messageStore.message，3秒后消失）

---

生成时间：2024-10-15  
完成步骤：5.4  
修改文件：1  
新增功能：Message Store 集成

