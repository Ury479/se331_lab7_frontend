<script setup lang="ts">
import type { Organizer } from '@/types/Organizer'
defineProps<{ organizer: Organizer }>()
</script>

<template>
  <RouterLink
    class="organizer-link"
    :to="{ name: 'organizer-detail-view', params: { id: String(organizer.id) } }"
  >
    <div
      class="group cursor-pointer bg-gradient-to-br from-indigo-800/60 to-purple-900/60 border border-indigo-400/30 rounded-xl p-6 hover:border-pink-400/60 hover:shadow-2xl hover:shadow-indigo-400/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <div
          class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-lg flex items-center justify-center"
        >
          <span class="text-2xl">👤</span>
        </div>
        <div class="text-right">
          <div class="text-xs text-indigo-300 font-medium">ORGANIZER</div>
          <div class="text-xs text-pink-300 font-medium">#{{ organizer.id }}</div>
        </div>
      </div>

      <div v-if="organizer.image" class="mb-4 rounded-lg overflow-hidden">
        <img
          :src="organizer.image"
          :alt="organizer.name"
          class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <h2
        class="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors duration-300"
      >
        {{ organizer.name }}
      </h2>

      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <span class="text-indigo-400">📧</span>
          <p class="text-indigo-300 text-sm font-medium truncate">{{ organizer.email }}</p>
        </div>
        <div v-if="organizer.phone" class="flex items-center space-x-2">
          <span class="text-purple-400">📱</span>
          <p class="text-purple-300 text-sm font-medium">{{ organizer.phone }}</p>
        </div>
        <div v-if="organizer.address" class="flex items-center space-x-2">
          <span class="text-pink-400">📍</span>
          <p class="text-pink-300 text-sm font-medium truncate">{{ organizer.address }}</p>
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <div
          class="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span class="text-sm font-medium">VIEW PROFILE →</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.organizer-link {
  text-decoration: none;
  color: inherit;
}
</style>

