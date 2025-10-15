<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin, mdiAccount, mdiLogout } from '@mdi/js'

const store = useMessageStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div id="layout" class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <!-- 导航栏 -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-cyan-400/20">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <!-- Flash Message -->
        <div v-if="message" class="mb-4 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-lg text-yellow-300 text-center animate-pulse">
          <h4 class="font-bold">{{ message }}</h4>
        </div>

        <!-- 导航链接 -->
        <div class="wrapper">
          <nav class="py-6">
            <!-- 未登录时显示 Sign Up 和 Login -->
            <nav v-if="!authStore.currentUserName" class="flex">
              <ul class="flex navbar-nav ml-auto">
                <li class="nav-item px-2">
                  <RouterLink to="/register" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiAccountPlus" />
                      <span class="ml-3">Sign Up</span>
                    </div>
                  </RouterLink>
                </li>
                <li class="nav-item px-2">
                  <RouterLink to="/login" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiLogin" />
                      <span class="ml-3">Login</span>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </nav>

            <!-- 已登录时显示用户信息 -->
            <nav v-if="authStore.currentUserName" class="flex">
              <ul class="flex navbar-nav ml-auto">
                <li class="nav-item px-2">
                  <RouterLink to="/profile" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiAccount" />
                      <span class="ml-3">{{ authStore.currentUserName }}</span>
                    </div>
                  </RouterLink>
                </li>
                <li class="nav-item px-2">
                  <a class="nav-link hover:cursor-pointer" @click="logout">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiLogout" />
                      <span class="ml-3">LogOut</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </nav>
          <RouterLink
            class="font-bold text-gray-300 hover:text-white transition-colors"
            exact-active-class="text-green-400"
            to="/"
          >
            Home
          </RouterLink>
        </div>

        <!-- 原有导航链接 -->
        <nav class="flex justify-center space-x-4 flex-wrap mt-4">
          <RouterLink
            to="/"
            class="px-5 py-3 bg-black/30 border border-cyan-400/30 rounded-lg text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-cyan-400/20 border-cyan-400 text-cyan-200"
          >
            EVENTS
          </RouterLink>
          <RouterLink
            to="/organizers"
            class="px-5 py-3 bg-black/30 border border-indigo-400/30 rounded-lg text-indigo-300 hover:bg-indigo-400/10 hover:border-indigo-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-indigo-400/20 border-indigo-400 text-indigo-200"
          >
            ORGANIZERS
          </RouterLink>
          <RouterLink
            to="/organizer-form"
            class="px-5 py-3 bg-black/30 border border-pink-400/30 rounded-lg text-pink-300 hover:bg-pink-400/10 hover:border-pink-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-pink-400/20 border-pink-400 text-pink-200"
          >
            ADD ORGANIZER
          </RouterLink>
          <RouterLink
            :to="{ name: 'about' }"
            class="px-5 py-3 bg-black/30 border border-purple-400/30 rounded-lg text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-purple-400/20 border-purple-400 text-purple-200"
          >
            ABOUT
          </RouterLink>
          <RouterLink
            to="/students"
            class="px-5 py-3 bg-black/30 border border-green-400/30 rounded-lg text-green-300 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-green-400/20 border-green-400 text-green-200"
          >
            STUDENT
          </RouterLink>
          <RouterLink
            to="/event-form"
            class="px-5 py-3 bg-black/30 border border-yellow-400/30 rounded-lg text-yellow-300 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 font-bold text-base no-underline"
            exact-active-class="bg-yellow-400/20 border-yellow-400 text-yellow-200"
          >
            EVENT FORM
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main>
      <RouterView />
    </main>

    <SpeedInsights />
  </div>
</template>

<style>
/* 自定义动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade {
  animation: fadeIn 0.5s ease-out;
}

/* 导航链接样式 */
.nav-link {
  @apply px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10;
}

.nav-link.router-link-active {
  @apply text-green-400 bg-white/5;
}

.navbar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.wrapper {
  @apply flex items-center justify-between px-4;
}

/* 背景图案 */
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23334155' stroke-width='0.5' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E");
}

.bg-circuit-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='circuit' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23334155' stroke-width='0.5' opacity='0.2'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23334155' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23circuit)'/%3E%3C/svg%3E");
}

.bg-hexagon-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='hexagon' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='15,5 25,10 25,20 15,25 5,20 5,10' fill='none' stroke='%23334155' stroke-width='0.5' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23hexagon)'/%3E%3C/svg%3E");
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0891b2, #7c3aed);
}
</style>
