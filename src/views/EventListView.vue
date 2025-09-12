<template>
  <div class="events-page">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Events For Good</h1>

    <div class="mb-6 flex justify-center">
      <label class="text-gray-700 font-medium">
        Page size:
        <select v-model.number="perPageLocal" class="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="5">5</option>
          <option :value="10">10</option>
        </select>
        events per page
      </label>
    </div>

    <div v-if="events && events.length > 0" class="events-container max-w-4xl mx-auto">
      <div v-for="event in events" :key="event.id" class="event-item mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <CategoryOrganizer :event="event" />
        <EventCard :event="event" />
      </div>
    </div>

    <div v-else-if="events === null" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading events...</p>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-600">No events found.</p>
    </div>

    <div class="flex justify-center mt-8">
      <div class="flex space-x-4">
        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPageLocal } }"
          rel="prev"
          v-if="page != 1"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 no-underline"
        >
          &lt;&lt; Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPageLocal } }"
          rel="next"
          v-if="hasNextPage"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 no-underline"
        >
          Next Page &gt;&gt;
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import CategoryOrganizer from '../components/CategoryOrganizer.vue'
import { type Event } from '@/types'
import { ref, watchEffect, computed, watch } from 'vue'
import EventService from '../services/EventService'
import { useRouter, useRoute } from 'vue-router'

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
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPageLocal.value)
  return page.value < totalPages
})

watchEffect(() => {
  console.log('Fetching events with:', { perPage: perPageLocal.value, page: page.value })
  console.log('API Base URL:', import.meta.env.VITE_BACKEND_URL)

  EventService.getEvents(perPageLocal.value, page.value)
    .then((response) => {
      console.log('Events response:', response.data)
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
    })
    .catch((error) => {
      console.error('API Error:', error)
      console.error('Error details:', error.response?.data)
      console.error('Error status:', error.response?.status)
      console.error('Error config:', error.config)
      // 设置空数组而不是 null，这样就不会显示加载状态
      events.value = []
    })
})

watch(perPageLocal, (newVal) => {
  router.push({ name: 'event-list-view', query: { page: 1, perPage: newVal } })
})
</script>

<style scoped>
/* 所有样式现在使用 Tailwind CSS 类名 */
</style>
