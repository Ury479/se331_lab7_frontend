<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="category-organizer bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 text-white px-6 py-4 rounded-xl shadow-lg mb-4 backdrop-blur-sm">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span class="text-sm">🏷️</span>
        </div>
        <span class="category font-bold text-cyan-300 text-lg">{{ event.category.toUpperCase() }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-purple-300 text-sm font-medium">by</span>
        <span class="organizer text-purple-300 font-bold text-lg">{{ event.organizer }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-organizer {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1" fill="white" opacity="0.3"/></pattern></defs><rect width="50" height="50" fill="url(%23dots)"/></rect></svg>');
  background-blend-mode: multiply;
}
</style>
