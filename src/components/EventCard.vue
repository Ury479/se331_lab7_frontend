<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="event-card-container">
    <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: String(event.id) } }">
      <div class="group cursor-pointer bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-400/30 rounded-xl p-6 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
        <!-- 事件图标 -->
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-2xl">🎯</span>
          </div>
          <div class="text-right">
            <div class="text-xs text-cyan-300 font-medium">EVENT</div>
            <div class="text-xs text-purple-300 font-medium">#{{ event.id }}</div>
          </div>
        </div>

        <!-- 事件标题 -->
        <h2 class="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
          {{ event.title }}
        </h2>

        <!-- 事件信息 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <span class="text-cyan-400">⏰</span>
            <p class="text-cyan-300 text-sm font-medium">@{{ event.time }} on {{ event.date }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-purple-400">📍</span>
            <p class="text-purple-300 text-sm font-medium">{{ event.location }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">🏷️</span>
            <p class="text-green-300 text-sm font-medium">{{ event.category }}</p>
          </div>
        </div>

        <!-- 悬停效果指示器 -->
        <div class="mt-4 flex justify-end">
          <div class="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-sm font-medium">VIEW DETAILS →</span>
          </div>
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
