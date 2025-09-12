<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="cat-org bg-gradient-to-r from-blue-400 to-green-400 text-white px-4 py-2 rounded-md shadow-md">
    <span class="category font-semibold">{{ event.category }}</span>
    <span class="organizer ml-4 text-blue-100">{{ event.organizer }}</span>
  </div>
</template>

<style scoped>
.cat-org {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1" fill="white" opacity="0.3"/></pattern></defs><rect width="50" height="50" fill="url(%23dots)"/></rect></svg>');
  background-blend-mode: multiply;
  padding: 8px 12px;
  border-radius: 6px;
  margin: 8px 0;
}
.category, .organizer {
  font-size: 16px;
  text-align: right;
}
</style> 