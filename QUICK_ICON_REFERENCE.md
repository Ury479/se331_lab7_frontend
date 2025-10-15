# 🎯 图标快速参考

## 🚀 快速开始

### 1. 导入图标
```typescript
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiEmail, mdiLock } from '@mdi/js'
```

### 2. 使用图标
```vue
<SvgIcon type="mdi" :path="mdiAccount" :size="24" />
```

## 📚 常用图标速查

### 🔐 认证相关
```typescript
import {
  mdiLogin,           // 登录
  mdiLogout,          // 登出
  mdiAccount,         // 账户
  mdiAccountCircle,   // 账户圆圈
  mdiEmail,           // 邮件
  mdiLock,            // 锁
  mdiLockOpen,        // 打开的锁
  mdiKey,             // 钥匙
  mdiShield,          // 盾牌
  mdiFingerprint,     // 指纹
} from '@mdi/js'
```

### ✅ 状态图标
```typescript
import {
  mdiCheckCircle,     // ✓ 成功
  mdiAlertCircle,     // ⚠ 警告
  mdiCloseCircle,     // ✗ 错误
  mdiInformation,     // ℹ 信息
  mdiHelpCircle,      // ❓ 帮助
  mdiLoading,         // ⟳ 加载中
} from '@mdi/js'
```

### 🎨 UI 控件
```typescript
import {
  mdiMenu,            // ☰ 菜单
  mdiClose,           // ✕ 关闭
  mdiChevronDown,     // ⌄ 下箭头
  mdiChevronUp,       // ⌃ 上箭头
  mdiChevronLeft,     // ‹ 左箭头
  mdiChevronRight,    // › 右箭头
  mdiArrowLeft,       // ← 返回箭头
  mdiArrowRight,      // → 前进箭头
  mdiHome,            // 🏠 首页
  mdiCog,             // ⚙ 设置
} from '@mdi/js'
```

### ✏️ 操作图标
```typescript
import {
  mdiPlus,            // + 添加
  mdiMinus,           // - 减少
  mdiPencil,          // ✎ 编辑
  mdiDelete,          // 🗑 删除
  mdiTrashCan,        // 垃圾桶
  mdiContentSave,     // 💾 保存
  mdiRefresh,         // ⟳ 刷新
  mdiDownload,        // ⬇ 下载
  mdiUpload,          // ⬆ 上传
  mdiMagnify,         // 🔍 搜索
  mdiFilter,          // 🔽 筛选
  mdiSort,            // ↕ 排序
} from '@mdi/js'
```

### 📁 文件相关
```typescript
import {
  mdiFile,            // 📄 文件
  mdiFileDocument,    // 文档
  mdiFolder,          // 📁 文件夹
  mdiFileImage,       // 🖼 图片
  mdiFileVideo,       // 🎬 视频
  mdiFileMusic,       // 🎵 音乐
  mdiFilePdf,         // PDF
  mdiFileExcel,       // Excel
  mdiFileWord,        // Word
} from '@mdi/js'
```

### 💬 通讯相关
```typescript
import {
  mdiMessage,         // 💬 消息
  mdiChat,            // 聊天
  mdiEmail,           // 📧 邮件
  mdiPhone,           // 📞 电话
  mdiBell,            // 🔔 通知
  mdiBellOutline,     // 铃铛轮廓
  mdiSend,            // ✉ 发送
} from '@mdi/js'
```

### 👥 用户相关
```typescript
import {
  mdiAccount,         // 用户
  mdiAccountGroup,    // 用户组
  mdiAccountPlus,     // 添加用户
  mdiAccountMinus,    // 删除用户
  mdiAccountEdit,     // 编辑用户
  mdiAccountCircle,   // 用户头像
} from '@mdi/js'
```

### ⭐ 其他常用
```typescript
import {
  mdiHeart,           // ❤ 喜欢
  mdiHeartOutline,    // ♡ 喜欢轮廓
  mdiStar,            // ⭐ 星星
  mdiStarOutline,     // ☆ 星星轮廓
  mdiEye,             // 👁 查看
  mdiEyeOff,          // 隐藏
  mdiCalendar,        // 📅 日历
  mdiClock,           // 🕐 时钟
  mdiMapMarker,       // 📍 位置
  mdiLink,            // 🔗 链接
  mdiShare,           // 分享
  mdiPrinter,         // 🖨 打印
} from '@mdi/js'
```

## 🎨 样式示例

### 基础用法
```vue
<SvgIcon type="mdi" :path="mdiAccount" :size="24" />
```

### 带颜色
```vue
<SvgIcon type="mdi" :path="mdiCheckCircle" :size="24" class="text-green-500" />
```

### 在按钮中
```vue
<button class="flex items-center gap-2">
  <SvgIcon type="mdi" :path="mdiPlus" :size="20" />
  <span>Add Item</span>
</button>
```

### 在输入框中
```vue
<div class="relative">
  <div class="absolute left-3 top-1/2 -translate-y-1/2">
    <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-gray-400" />
  </div>
  <input class="pl-10" placeholder="Email" />
</div>
```

### 旋转图标
```vue
<SvgIcon type="mdi" :path="mdiLoading" :size="24" :rotate="90" />
```

### 翻转图标
```vue
<SvgIcon type="mdi" :path="mdiArrowLeft" :horizontal="true" />
<SvgIcon type="mdi" :path="mdiChevronUp" :vertical="true" />
```

## 🎯 尺寸参考

| 尺寸 | 用途 |
|------|------|
| 16px | 小图标、内联文本 |
| 20px | 输入框图标、按钮图标 |
| 24px | 默认大小、列表图标 |
| 32px | 大图标、卡片图标 |
| 48px | 特大图标、头部图标 |
| 64px+ | 装饰性图标 |

## 🌈 颜色方案

### Tailwind CSS 颜色
```vue
<!-- 成功 -->
<SvgIcon ... class="text-green-500" />

<!-- 错误 -->
<SvgIcon ... class="text-red-500" />

<!-- 警告 -->
<SvgIcon ... class="text-yellow-500" />

<!-- 信息 -->
<SvgIcon ... class="text-blue-500" />

<!-- 中性 -->
<SvgIcon ... class="text-gray-500" />
```

## 🔍 查找更多图标

**官方网站**: https://pictogrammers.com/library/mdi/

**搜索技巧**:
1. 访问官网
2. 搜索关键词 (英文)
3. 找到图标名称
4. 转换为驼峰命名: `arrow-left` → `mdiArrowLeft`
5. 导入使用

## 💡 最佳实践

1. **集中导入**: 在文件顶部一次性导入所有需要的图标
2. **语义化命名**: 使用有意义的变量名
3. **一致尺寸**: 同一场景使用相同尺寸
4. **颜色规范**: 遵循设计系统的颜色规范
5. **无障碍**: 为图标添加 `aria-label` (重要操作)

## 📝 完整示例

```vue
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { 
  mdiAccount, 
  mdiEmail, 
  mdiLock, 
  mdiLogin,
  mdiCheckCircle,
  mdiAlertCircle 
} from '@mdi/js'
</script>

<template>
  <div class="login-form">
    <!-- 头部图标 -->
    <div class="header">
      <SvgIcon type="mdi" :path="mdiLogin" :size="48" class="text-indigo-600" />
      <h1>Welcome Back</h1>
    </div>

    <!-- Email 输入框 -->
    <div class="input-group">
      <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-gray-400" />
      <input type="email" placeholder="Email" />
    </div>

    <!-- 密码输入框 -->
    <div class="input-group">
      <SvgIcon type="mdi" :path="mdiLock" :size="20" class="text-gray-400" />
      <input type="password" placeholder="Password" />
    </div>

    <!-- 按钮 -->
    <button>
      <SvgIcon type="mdi" :path="mdiLogin" :size="20" />
      <span>Sign in</span>
    </button>

    <!-- 状态提示 -->
    <div class="success">
      <SvgIcon type="mdi" :path="mdiCheckCircle" :size="20" class="text-green-500" />
      <span>Login successful!</span>
    </div>

    <div class="error">
      <SvgIcon type="mdi" :path="mdiAlertCircle" :size="20" class="text-red-500" />
      <span>Invalid credentials</span>
    </div>
  </div>
</template>
```

---

**图标总数**: 7000+  
**更新日期**: 2024-10-15  
**版本**: @mdi/js v7.x

