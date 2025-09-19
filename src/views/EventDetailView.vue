<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
import { type Event } from '@/types'
import EventService from '../services/EventService'
import { useRouter } from 'vue-router'
const event = ref<Event|null>(null)
const allIds = ref<number[]>([])
const prevId = ref<number|null>(null)
const nextId = ref<number|null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter()

async function loadEventAndIds(curId: number) {
  await EventService.getEvent(curId)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  await EventService.getAllEventIds()
    .then((response) => {
      allIds.value = response.data.map((e: Event) => Number(e.id)).sort((a, b) => a - b)
      const idx = allIds.value.indexOf(curId)
      prevId.value = idx > 0 ? allIds.value[idx - 1] : null
      nextId.value = idx >= 0 && idx < allIds.value.length - 1 ? allIds.value[idx + 1] : null
    })
    .catch((error) => {
      console.error('Error loading all event ids', error)
    })
}

onMounted(() => {
  loadEventAndIds(Number(props.id))
})

watch(() => props.id, (newId) => {
  loadEventAndIds(Number(newId))
})

function goTo(id: number|null) {
  if (id) router.push({ name: 'event-detail-view', params: { id: String(id) } })
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
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
        <div class="text-center mb-12">
          <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
            {{ event.title }}
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <!-- 事件详情卡片 -->
        <div class="bg-black/60 backdrop-blur-md border border-cyan-400/40 rounded-2xl p-10 shadow-2xl shadow-cyan-400/30 mb-12 animate-fade-in-up event-card relative overflow-hidden">
          <!-- 卡片内部光效 -->
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none"></div>
          <div class="relative z-10">
          <!-- 基本信息 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- 时间信息 -->
            <div class="space-y-6">
              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-cyan-400 text-lg font-bold">Date</h3>
                  <p class="text-white text-xl font-medium">{{ formatDate(event.date) }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center group-hover:bg-purple-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-purple-400 text-lg font-bold">Time</h3>
                  <p class="text-white text-xl font-medium">{{ event.time }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center group-hover:bg-green-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-green-400 text-lg font-bold">Location</h3>
                  <p class="text-white text-xl font-medium">{{ event.location }}</p>
                </div>
              </div>
            </div>

            <!-- 其他信息 -->
            <div class="space-y-6">
              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-pink-400/20 rounded-lg flex items-center justify-center group-hover:bg-pink-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-pink-400 text-lg font-bold">Organizer</h3>
                  <p class="text-white text-xl font-medium">{{ event.organizer }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-yellow-400 text-lg font-bold">Category</h3>
                  <p class="text-white text-xl font-medium">{{ event.category }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 group">
                <div class="w-12 h-12 bg-indigo-400/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-400/30 transition-colors duration-300">
                  <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-indigo-400 text-lg font-bold">Pets Allowed</h3>
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="event.petsAllowed ? 'bg-green-500/20' : 'bg-red-500/20'">
                      <svg v-if="event.petsAllowed" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      <svg v-else class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-white text-xl font-bold" :class="event.petsAllowed ? 'text-green-400' : 'text-red-400'">
                      {{ event.petsAllowed ? 'YES' : 'NO' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 描述信息 -->
          <div class="border-t border-cyan-400/30 pt-8">
            <h3 class="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Event Description
            </h3>
            <div class="bg-black/20 rounded-xl p-6 border border-cyan-400/20">
              <p class="text-gray-200 text-lg leading-relaxed font-medium">{{ event.description }}</p>
            </div>
          </div>
          </div>
        </div>

        <!-- 导航按钮 -->
        <div class="flex justify-center space-x-6">
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
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

.animate-pulse {
  animation: pulse 2s infinite;
}

/* 悬停效果 */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 卡片悬停效果 */
.event-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
}

.event-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.1), transparent);
  transition: left 0.5s;
}

.event-card:hover::before {
  left: 100%;
}

/* 信息卡片悬停效果 */
.space-y-6 > div {
  transition: all 0.3s ease;
}

.space-y-6 > div:hover {
  transform: translateX(5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* 按钮悬停效果 */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

button:hover::before {
  left: 100%;
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

.text-pink-400 {
  text-shadow: 0 0 10px rgba(244, 114, 182, 0.3);
}

.text-yellow-400 {
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
}

.text-indigo-400 {
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
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

  .space-y-6 > div {
    padding: 0.75rem;
  }

  .space-y-6 > div:hover {
    transform: translateX(2px);
  }
}
</style>
