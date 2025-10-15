<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { 
  mdiAccount, 
  mdiLock, 
  mdiEmail,
  mdiCheckCircle,
  mdiAlertCircle,
  mdiInformation,
  mdiHome,
  mdiCog
} from '@mdi/js'
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold">MDI Icons 示例</h2>

    <!-- 基础图标 -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold">基础图标</h3>
      <div class="flex gap-4 items-center">
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiAccount" :size="32" />
          <span class="text-sm">Account</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiEmail" :size="32" />
          <span class="text-sm">Email</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiLock" :size="32" />
          <span class="text-sm">Lock</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiHome" :size="32" />
          <span class="text-sm">Home</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiCog" :size="32" />
          <span class="text-sm">Settings</span>
        </div>
      </div>
    </section>

    <!-- 带颜色的图标 -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold">带颜色的图标</h3>
      <div class="flex gap-4 items-center">
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiCheckCircle" :size="32" class="text-green-500" />
          <span class="text-sm">Success</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiAlertCircle" :size="32" class="text-red-500" />
          <span class="text-sm">Error</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon type="mdi" :path="mdiInformation" :size="32" class="text-blue-500" />
          <span class="text-sm">Info</span>
        </div>
      </div>
    </section>

    <!-- 不同大小 -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold">不同大小</h3>
      <div class="flex gap-4 items-center">
        <SvgIcon type="mdi" :path="mdiAccount" :size="16" />
        <SvgIcon type="mdi" :path="mdiAccount" :size="24" />
        <SvgIcon type="mdi" :path="mdiAccount" :size="32" />
        <SvgIcon type="mdi" :path="mdiAccount" :size="48" />
        <SvgIcon type="mdi" :path="mdiAccount" :size="64" />
      </div>
    </section>

    <!-- 在按钮中使用 -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold">在按钮中使用</h3>
      <div class="flex gap-4">
        <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <SvgIcon type="mdi" :path="mdiEmail" :size="20" />
          <span>Send Email</span>
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          <SvgIcon type="mdi" :path="mdiCheckCircle" :size="20" />
          <span>Confirm</span>
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          <SvgIcon type="mdi" :path="mdiCog" :size="20" />
          <span>Settings</span>
        </button>
      </div>
    </section>

    <!-- 在输入框中使用 -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold">在输入框中使用</h3>
      <div class="space-y-3 max-w-md">
        <div class="relative">
          <div class="absolute left-3 top-1/2 -translate-y-1/2">
            <SvgIcon type="mdi" :path="mdiAccount" :size="20" class="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Username" 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="relative">
          <div class="absolute left-3 top-1/2 -translate-y-1/2">
            <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-gray-400" />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="relative">
          <div class="absolute left-3 top-1/2 -translate-y-1/2">
            <SvgIcon type="mdi" :path="mdiLock" :size="20" class="text-gray-400" />
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  </div>
</template>

