<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '@/stores/event'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import EventService from '@/services/EventService'
import { ref, onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const store = useEventStore()
const { event } = storeToRefs(store)
const allIds = ref<number[]>([])
const prevId = ref<number|null>(null)
const nextId = ref<number|null>(null)

async function updatePrevNext(id: number) {
  const res = await EventService.getAllEventIds()
  allIds.value = res.data.map((e: any) => Number(e.id)).sort((a, b) => a - b)
  const idx = allIds.value.indexOf(id)
  prevId.value = idx > 0 ? allIds.value[idx - 1] : null
  nextId.value = idx >= 0 && idx < allIds.value.length - 1 ? allIds.value[idx + 1] : null
}

onMounted(() => {
  if (event.value) updatePrevNext(Number(route.params.id))
})
watch(() => route.params.id, (newId) => {
  if (event.value) updatePrevNext(Number(newId))
})
function goTo(id: number|null) {
  if (id) router.push({ name: 'event-detail-view', params: { id: String(id) } })
}

onBeforeRouteUpdate((to, from, next) => {
  const id = Number(to.params.id)
  EventService.getEvent(id)
    .then((response) => {
      store.setEvent(response.data)
      updatePrevNext(id)
      next()
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        next({ name: '404-resource-view', params: { resource: 'event' } })
      } else {
        next({ name: 'network-error-view' })
      }
    })
})
</script>
<template>
  <div v-if="event" class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-circuit-pattern opacity-20"></div>

    <div class="relative z-10">
      <!-- 返回按钮 -->
      <div class="pt-8 px-4">
        <button
          @click="$router.push({ name: 'event-list-view' })"
          class="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <svg class="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Events
        </button>
      </div>

      <!-- 主要内容区域 -->
      <div class="max-w-4xl mx-auto px-4 py-12">
        <!-- 事件标题 -->
        <div class="text-center mb-12 animate-fade-in-up">
          <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
            {{ event.title }}
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <!-- 导航标签 -->
        <div class="flex justify-center mb-12 animate-slide-in-left">
          <div class="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-2 shadow-2xl shadow-cyan-400/20">
            <nav class="flex space-x-1">
              <router-link
                :to="{ name: 'event-detail-view' }"
                class="px-6 py-3 rounded-xl text-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200 transition-all duration-300 font-bold text-lg"
                :class="{ 'bg-cyan-400/30 text-cyan-100': $route.name === 'event-detail-view' }"
              >
                Details
              </router-link>
              <router-link
                :to="{ name: 'event-register-view' }"
                class="px-6 py-3 rounded-xl text-purple-300 hover:bg-purple-400/20 hover:text-purple-200 transition-all duration-300 font-bold text-lg"
                :class="{ 'bg-purple-400/30 text-purple-100': $route.name === 'event-register-view' }"
              >
                Register
              </router-link>
              <router-link
                :to="{ name: 'event-edit-view' }"
                class="px-6 py-3 rounded-xl text-green-300 hover:bg-green-400/20 hover:text-green-200 transition-all duration-300 font-bold text-lg"
                :class="{ 'bg-green-400/30 text-green-100': $route.name === 'event-edit-view' }"
              >
                Edit
              </router-link>
            </nav>
          </div>
        </div>

        <!-- 子路由内容 -->
        <div class="animate-fade-in-up">
          <RouterView :event="event" :id="route.params.id" />
        </div>

        <!-- 导航按钮 -->
        <div class="flex justify-center space-x-6 mt-12 animate-slide-in-right">
          <button
            v-if="prevId"
            @click="goTo(prevId)"
            class="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-xl text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 font-bold text-lg flex items-center group backdrop-blur-sm"
          >
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Previous Event
          </button>

          <button
            v-if="nextId"
            @click="goTo(nextId)"
            class="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 font-bold text-lg flex items-center group backdrop-blur-sm"
          >
            Next Event
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 自定义动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}

/* 文字发光效果 */
.text-cyan-400 {
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}

.text-purple-400 {
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.text-green-400 {
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
}

.text-cyan-300 {
  text-shadow: 0 0 8px rgba(6, 182, 212, 0.2);
}

.text-purple-300 {
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
}

.text-green-300 {
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.2);
}

/* 按钮悬停效果 */
button, a {
  position: relative;
  overflow: hidden;
}

button::before, a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

button:hover::before, a:hover::before {
  left: 100%;
}

/* 导航链接样式 */
nav a {
  text-decoration: none;
  transition: all 0.3s ease;
}

nav a:hover {
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>
