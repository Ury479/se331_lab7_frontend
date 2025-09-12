<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="event-card-container mb-6">
    <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: String(event.id) } }">
      <div class="cursor-pointer border border-gray-600 p-5 w-64 mb-4 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all duration-300">
        <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
        <div class="space-y-1">
          <p class="text-purple-100 text-sm">@{{ event.time }} on {{ event.date }}</p>
          <p class="text-purple-100 text-sm">{{ event.category }} @ {{ event.location }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2e3e50;
}
</style>
