# 🎨 MDI Icons 使用指南

已安装：**@mdi/js** + **@jamescoyle/vue-icon**

版本：0.1.2  
下载量：626,875+

---

## 📦 已安装的包

```json
"@mdi/js": "^7.x.x",
"@jamescoyle/vue-icon": "^0.1.2"
```

---

## 🚀 基本用法

### 1. 在组件中导入

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
</script>

<template>
  <SvgIcon type="mdi" :path="mdiAccount" />
</template>
```

---

## 🎯 常用图标示例

### 示例 1：用户账号图标

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
</script>

<template>
  <div class="flex items-center gap-2">
    <SvgIcon type="mdi" :path="mdiAccount" :size="24" />
    <span>用户账号</span>
  </div>
</template>
```

### 示例 2：登录表单图标

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiLock, mdiEmail } from '@mdi/js'
</script>

<template>
  <!-- Email 图标 -->
  <div class="flex items-center gap-2">
    <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-gray-500" />
    <input type="email" placeholder="Email" />
  </div>

  <!-- 密码图标 -->
  <div class="flex items-center gap-2">
    <SvgIcon type="mdi" :path="mdiLock" :size="20" class="text-gray-500" />
    <input type="password" placeholder="Password" />
  </div>
</template>
```

### 示例 3：带颜色和大小的图标

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckCircle, mdiAlertCircle, mdiInformation } from '@mdi/js'
</script>

<template>
  <!-- 成功图标 - 绿色 -->
  <SvgIcon type="mdi" :path="mdiCheckCircle" :size="32" class="text-green-500" />

  <!-- 错误图标 - 红色 -->
  <SvgIcon type="mdi" :path="mdiAlertCircle" :size="32" class="text-red-500" />

  <!-- 信息图标 - 蓝色 -->
  <SvgIcon type="mdi" :path="mdiInformation" :size="32" class="text-blue-500" />
</template>
```

---

## 📚 常用图标列表

### 用户相关
```typescript
import {
  mdiAccount,           // 用户
  mdiAccountCircle,     // 用户圆圈
  mdiAccountGroup,      // 用户组
  mdiLogin,            // 登录
  mdiLogout,           // 登出
} from '@mdi/js'
```

### UI 相关
```typescript
import {
  mdiMenu,             // 菜单
  mdiClose,            // 关闭
  mdiChevronDown,      // 下箭头
  mdiChevronUp,        // 上箭头
  mdiChevronLeft,      // 左箭头
  mdiChevronRight,     // 右箭头
} from '@mdi/js'
```

### 状态图标
```typescript
import {
  mdiCheckCircle,      // 成功
  mdiAlertCircle,      // 警告
  mdiCloseCircle,      // 错误
  mdiInformation,      // 信息
  mdiLoading,          // 加载中
} from '@mdi/js'
```

### 操作图标
```typescript
import {
  mdiPlus,             // 添加
  mdiMinus,            // 减少
  mdiPencil,           // 编辑
  mdiDelete,           // 删除
  mdiContentSave,      // 保存
  mdiRefresh,          // 刷新
} from '@mdi/js'
```

---

## 🎨 高级用法

### 1. 动态图标

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEye, mdiEyeOff } from '@mdi/js'

const showPassword = ref(false)
const passwordIcon = computed(() => showPassword.value ? mdiEye : mdiEyeOff)
</script>

<template>
  <button @click="showPassword = !showPassword">
    <SvgIcon type="mdi" :path="passwordIcon" :size="20" />
  </button>
</template>
```

### 2. 图标按钮

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete, mdiPencil } from '@mdi/js'
</script>

<template>
  <div class="flex gap-2">
    <!-- 编辑按钮 -->
    <button class="p-2 rounded hover:bg-blue-100">
      <SvgIcon type="mdi" :path="mdiPencil" :size="18" class="text-blue-600" />
    </button>

    <!-- 删除按钮 -->
    <button class="p-2 rounded hover:bg-red-100">
      <SvgIcon type="mdi" :path="mdiDelete" :size="18" class="text-red-600" />
    </button>
  </div>
</template>
```

### 3. 创建可复用的图标组件

```vue
<!-- src/components/Icon.vue -->
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'

interface Props {
  path: string
  size?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})
</script>

<template>
  <SvgIcon 
    type="mdi" 
    :path="path" 
    :size="size" 
    :style="{ color }" 
  />
</template>
```

使用：
```vue
<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { mdiAccount } from '@mdi/js'
</script>

<template>
  <Icon :path="mdiAccount" :size="32" color="#3b82f6" />
</template>
```

---

## 💡 实际应用示例

### 在 LoginView 中使用图标

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputText from '@/components/InputText.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiLock, mdiLogin } from '@mdi/js'

const router = useRouter()
const authStore = useAuthStore()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Email 输入框 -->
    <div class="relative">
      <div class="absolute left-3 top-1/2 -translate-y-1/2">
        <SvgIcon type="mdi" :path="mdiAccount" :size="20" class="text-gray-400" />
      </div>
      <input 
        type="email" 
        placeholder="Email" 
        class="pl-10"
      />
    </div>

    <!-- 密码输入框 -->
    <div class="relative">
      <div class="absolute left-3 top-1/2 -translate-y-1/2">
        <SvgIcon type="mdi" :path="mdiLock" :size="20" class="text-gray-400" />
      </div>
      <input 
        type="password" 
        placeholder="Password" 
        class="pl-10"
      />
    </div>

    <!-- 登录按钮 -->
    <button type="submit" class="flex items-center justify-center gap-2">
      <SvgIcon type="mdi" :path="mdiLogin" :size="20" />
      <span>Sign in</span>
    </button>
  </form>
</template>
```

---

## 🔍 查找更多图标

访问官方图标库：
- **Material Design Icons**: https://pictogrammers.com/library/mdi/
- **搜索图标**: 在网站上搜索需要的图标
- **复制名称**: 找到图标后，名称格式为 `mdiIconName`

示例：
- 搜索 "home" → 找到 "Home" → 导入为 `mdiHome`
- 搜索 "settings" → 找到 "Settings" → 导入为 `mdiCog`

---

## 📝 Props 选项

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | - | 图标类型，固定为 `"mdi"` |
| `path` | `string` | - | 图标路径（从 @mdi/js 导入） |
| `size` | `number` | `24` | 图标大小（像素） |
| `horizontal` | `boolean` | `false` | 水平翻转 |
| `vertical` | `boolean` | `false` | 垂直翻转 |
| `rotate` | `number` | `0` | 旋转角度（90, 180, 270） |

---

## 🎯 最佳实践

1. **统一导入位置**
   ```typescript
   // 在文件顶部集中导入所需图标
   import { 
     mdiAccount, 
     mdiLock, 
     mdiEmail 
   } from '@mdi/js'
   ```

2. **使用 Tailwind 控制颜色**
   ```vue
   <SvgIcon type="mdi" :path="mdiAccount" class="text-blue-500" />
   ```

3. **创建图标常量文件**
   ```typescript
   // src/config/icons.ts
   import {
     mdiAccount,
     mdiLock,
     mdiEmail,
     // ... 更多图标
   } from '@mdi/js'

   export const ICONS = {
     ACCOUNT: mdiAccount,
     LOCK: mdiLock,
     EMAIL: mdiEmail,
   } as const
   ```

4. **响应式大小**
   ```vue
   <SvgIcon 
     type="mdi" 
     :path="mdiAccount" 
     :size="isMobile ? 16 : 24" 
   />
   ```

---

## ✅ 安装验证

运行以下命令验证安装：
```bash
npm list @mdi/js @jamescoyle/vue-icon
```

应该看到：
```
se331_lab12_frontend@0.0.0
├── @jamescoyle/vue-icon@0.1.2
└── @mdi/js@7.x.x
```

---

## 🎉 完成！

现在可以在项目中使用 Material Design Icons 了！

**下一步：**
1. 在 LoginView.vue 中添加图标
2. 创建可复用的 Icon 组件
3. 浏览 https://pictogrammers.com/library/mdi/ 查找更多图标

---

生成时间：2024-10-15  
安装包：@mdi/js, @jamescoyle/vue-icon  
图标数量：7000+

