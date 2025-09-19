<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>

    <div class="relative z-10">
      <!-- 标题区域 -->
      <div class="text-center py-12">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
          EVENTS FOR GOOD
        </h1>
        <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <!-- 搜索框 -->
      <div class="mb-8 flex justify-center">
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
      <div class="mb-8 flex justify-center">
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

      <!-- 分页按钮 -->
      <div class="flex justify-center mt-12 pb-8">
        <div class="flex space-x-4">
          <RouterLink
            :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPageLocal, keyword: keyword || undefined } }"
            rel="prev"
            v-if="page != 1"
            class="px-6 py-3 bg-black/40 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 no-underline font-medium"
          >
            ← Prev Page
          </RouterLink>
          <RouterLink
            :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPageLocal, keyword: keyword || undefined } }"
            rel="next"
            v-if="hasNextPage"
            class="px-6 py-3 bg-black/40 border border-purple-400/50 rounded-lg text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 no-underline font-medium"
          >
            Next Page →
          </RouterLink>
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
  let queryFunction: Promise<any>
  console.log('updateKeyword called with:', { keyword: keyword.value, perPage: perPageLocal.value, page: page.value })

  if (keyword.value === '') {
    console.log('Fetching all events')
    queryFunction = EventService.getEvents(perPageLocal.value, page.value)
  } else {
    console.log('Searching events with keyword:', keyword.value)
    queryFunction = EventService.getEventsByKeyword(keyword.value, perPageLocal.value, page.value)
  }

  queryFunction
    .then((response) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
      console.log('totalEvent', totalEvents.value)
    })
    .catch((error) => {
      console.error('Error fetching events:', error)
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
    updateKeyword()
  })
})

watch(perPageLocal, (newVal) => {
  router.push({ name: 'event-list-view', query: { page: 1, perPage: newVal, keyword: keyword.value || undefined } })
})
</script>

<style scoped>
/* 所有样式现在使用 Tailwind CSS 类名 */
</style>
