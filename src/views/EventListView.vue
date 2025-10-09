<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-circuit-pattern opacity-20"></div>

    <div class="relative z-10">
      <!-- 标题区域 -->
      <div class="text-center py-12 animate-fade-in-up">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
          EVENTS FOR GOOD
        </h1>
        <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <!-- 搜索框 -->
      <div class="mb-8 flex justify-center animate-slide-in-left">
        <div class="w-64">
          <BaseInput v-model="keyword" label="Search..." type="text" @input="updateKeyword" />
        </div>
      </div>

      <!-- 搜索状态显示 -->
      <div v-if="keyword" class="mb-4 text-center">
        <div class="inline-block bg-cyan-400/20 border border-cyan-400/50 rounded-lg px-4 py-2">
          <span class="text-cyan-300">Searching for: </span>
          <span class="text-cyan-100 font-bold">"{{ keyword }}"</span>
          <span class="text-cyan-300 ml-2">({{ totalEvents }} results)</span>
        </div>
      </div>

      <!-- 分页控制 -->
      <div class="mb-8 flex justify-center animate-slide-in-right">
        <div class="bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4">
          <label class="text-cyan-300 font-medium text-lg">
            Page size:
            <select v-model.number="perPageLocal" class="ml-3 px-4 py-2 bg-gray-800 border border-cyan-400/50 rounded-md text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
              <option :value="2" class="bg-gray-800">2</option>
              <option :value="3" class="bg-gray-800">3</option>
              <option :value="5" class="bg-gray-800">5</option>
              <option :value="10" class="bg-gray-800">10</option>
            </select>
            <span class="ml-2 text-purple-300">events per page</span>
          </label>
        </div>
      </div>

      <!-- 事件列表 -->
      <div v-if="events && events.length > 0" class="events-container max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="event in events" :key="event.id" class="event-item group">
            <div class="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20">
              <CategoryOrganizer :event="event" />
              <EventCard :event="event" />
            </div>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-else-if="events === null" class="text-center py-16">
        <div class="inline-block">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto"></div>
          <p class="mt-6 text-cyan-300 text-xl font-medium">Loading events...</p>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-gray-400 text-xl">No events found.</p>
      </div>

      <!-- 分页控制区域 -->
      <div class="flex justify-center mt-12 pb-8">
        <div class="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 shadow-2xl shadow-cyan-400/20">
          <!-- 分页信息 -->
          <div class="text-center mb-6">
            <div class="text-cyan-300 text-lg font-bold mb-2">
              Page {{ page }} of {{ Math.ceil(totalEvents / perPageLocal) || 1 }}
            </div>
            <div class="text-gray-400 text-sm">
              Showing {{ events?.length || 0 }} of {{ totalEvents }} events
            </div>
          </div>

          <!-- 分页按钮 -->
          <div class="flex items-center justify-center space-x-4">
            <!-- 第一页按钮 -->
            <RouterLink
              :to="{ name: 'event-list-view', query: { page: 1, perPage: perPageLocal, keyword: keyword || undefined } }"
              v-if="page > 2"
              class="px-4 py-2 bg-cyan-400/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-400/30 hover:border-cyan-400 transition-all duration-300 no-underline font-medium text-sm"
            >
              1
            </RouterLink>

            <!-- 省略号 -->
            <span v-if="page > 3" class="text-gray-400 text-lg">...</span>

            <!-- 上一页按钮 -->
            <RouterLink
              :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPageLocal, keyword: keyword || undefined } }"
              rel="prev"
              v-if="page > 1"
              class="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-xl text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 no-underline font-bold text-lg flex items-center group shadow-lg hover:shadow-cyan-400/20"
            >
              <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </RouterLink>

            <!-- 当前页按钮 -->
            <div class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg">
              {{ page }}
            </div>

            <!-- 下一页按钮 -->
            <RouterLink
              :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPageLocal, keyword: keyword || undefined } }"
              rel="next"
              v-if="hasNextPage"
              class="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400 transition-all duration-300 no-underline font-bold text-lg flex items-center group shadow-lg hover:shadow-purple-400/20"
            >
              Next
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </RouterLink>

            <!-- 省略号 -->
            <span v-if="page < Math.ceil(totalEvents / perPageLocal) - 2" class="text-gray-400 text-lg">...</span>

            <!-- 最后一页按钮 -->
            <RouterLink
              :to="{ name: 'event-list-view', query: { page: Math.ceil(totalEvents / perPageLocal), perPage: perPageLocal, keyword: keyword || undefined } }"
              v-if="page < Math.ceil(totalEvents / perPageLocal) - 1"
              class="px-4 py-2 bg-purple-400/20 border border-purple-400/50 rounded-lg text-purple-300 hover:bg-purple-400/30 hover:border-purple-400 transition-all duration-300 no-underline font-medium text-sm"
            >
              {{ Math.ceil(totalEvents / perPageLocal) }}
            </RouterLink>
          </div>

          <!-- 快速跳转 -->
          <div class="mt-4 text-center">
            <div class="text-gray-400 text-sm mb-2">Quick Jump:</div>
            <div class="flex justify-center space-x-2">
              <button
                v-for="quickPage in getQuickPages()"
                :key="quickPage"
                @click="jumpToPage(quickPage)"
                :class="[
                  'px-3 py-1 text-xs rounded-md transition-all duration-300',
                  quickPage === page
                    ? 'bg-cyan-500 text-white font-bold'
                    : 'bg-gray-600/30 text-gray-300 hover:bg-cyan-400/20 hover:text-cyan-300'
                ]"
              >
                {{ quickPage }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import CategoryOrganizer from '../components/CategoryOrganizer.vue'
import { type Event } from '@/types'
import { ref, watchEffect, computed, watch, onMounted } from 'vue'
import EventService from '../services/EventService'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

interface Props {
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const router = useRouter()
const route = useRoute()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const perPageLocal = ref(Number(route.query.perPage) || 2)
const page = computed(() => props.page || Number(route.query.page) || 1)
const keyword = ref(String(route.query.keyword || ''))
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPageLocal.value)
  return page.value < totalPages
})

function updateKeyword() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let queryFunction: Promise<any>
  const apiParams = { keyword: keyword.value, perPage: perPageLocal.value, page: page.value }

  console.log('🔍 updateKeyword called with:', apiParams)
  console.log('📊 API Parameters:', {
    searchKeyword: keyword.value || 'none',
    pageSize: perPageLocal.value,
    currentPage: page.value,
    timestamp: new Date().toISOString()
  })

  if (keyword.value === '') {
    console.log('📡 API Call: Fetching all events')
    console.log('🌐 Request URL:', `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/events?_limit=${perPageLocal.value}&_page=${page.value}&_sort=id&_order=asc`)
    queryFunction = EventService.getEvents(perPageLocal.value, page.value)
  } else {
    console.log('🔎 API Call: Searching events with keyword:', keyword.value)
    console.log('🌐 Request URL:', `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/events?title=${keyword.value}&_limit=${perPageLocal.value}&_page=${page.value}&_sort=id&_order=asc`)
    queryFunction = EventService.getEventsByKeyword(keyword.value, perPageLocal.value, page.value)
  }

  queryFunction
    .then((response) => {
      events.value = response.data

      // 修复 x-total-count 读取问题
      const totalCount = response.headers['x-total-count'] ||
                        response.headers['X-Total-Count'] ||
                        response.headers['X-Total-Count'] ||
                        '0'
      totalEvents.value = parseInt(totalCount)

      console.log('✅ API Response Success:')
      console.log('📦 Response Data:', response.data)
      console.log('📈 Total Events Count:', totalEvents.value)
      console.log('📄 Current Page Events:', events.value?.length || 0)
      console.log('🔗 Response Headers:', {
        'x-total-count': response.headers['x-total-count'],
        'X-Total-Count': response.headers['X-Total-Count'],
        'content-type': response.headers['content-type'],
        'status': response.status
      })
      console.log('🔍 All Headers:', response.headers)
    })
    .catch((error) => {
      console.error('❌ API Error:', error)
      console.error('🚨 Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      })
      router.push({ name: 'network-error-view' })
    })
}

// 监听路由变化，更新搜索关键词
watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = String(newKeyword || '')
})

// 监听搜索关键词变化，重置到第一页
watch(keyword, () => {
  router.push({ name: 'event-list-view', query: { page: 1, perPage: perPageLocal.value, keyword: keyword.value || undefined } })
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(1, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
    updateKeyword()
  })
})

// 监听路由变化，当从其他页面返回时刷新数据
watch(() => route.path, () => {
  updateKeyword()
})

watch(perPageLocal, (newVal) => {
  router.push({ name: 'event-list-view', query: { page: 1, perPage: newVal, keyword: keyword.value || undefined } })
})

// 快速跳转功能
function getQuickPages() {
  const totalPages = Math.ceil(totalEvents.value / perPageLocal.value)
  const currentPage = page.value
  const pages = []

  // 显示当前页前后各2页
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

function jumpToPage(targetPage: number) {
  router.push({
    name: 'event-list-view',
    query: {
      page: targetPage,
      perPage: perPageLocal.value,
      keyword: keyword.value || undefined
    }
  })
}
</script>

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

/* 事件卡片悬停效果 */
.event-item {
  transition: all 0.3s ease;
}

.event-item:hover {
  transform: translateY(-5px);
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

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

/* 分页按钮特殊效果 */
.space-x-4 > * {
  transition: all 0.3s ease;
}

.space-x-4 > *:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* 搜索框增强效果 */
input:focus {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  border-color: #06b6d4;
}

/* 选择框增强效果 */
select:focus {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  border-color: #06b6d4;
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

  .space-x-4 > *:hover {
    transform: scale(1.02);
  }
}

/* 加载动画 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 卡片阴影效果 */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-cyan-400\/20 {
  box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.2);
}

.shadow-purple-400\/20 {
  box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.2);
}
</style>
