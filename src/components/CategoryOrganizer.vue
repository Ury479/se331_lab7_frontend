<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="category-organizer bg-gradient-to-r from-blue-400 to-green-400 text-white px-4 py-2 rounded-md shadow-md mb-2">
    <div class="flex justify-between items-center">
      <span class="category font-semibold">{{ event.category }}</span>
      <span class="organizer text-blue-100">{{ event.organizer }}</span>
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
