<template>
  <div v-if="organizer" class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-center mb-8 space-x-4">
        <RouterLink
          :to="{ name: 'organizer-detail-view', params: { id: organizer.id } }"
          class="px-6 py-3 bg-black/30 border border-indigo-400/30 rounded-lg text-indigo-300 hover:bg-indigo-400/10 hover:border-indigo-400 transition-all duration-300 font-bold no-underline"
          exact-active-class="bg-indigo-400/20 border-indigo-400 text-indigo-200"
        >
          📋 Profile
        </RouterLink>

        <RouterLink
          :to="{ name: 'organizer-list-view' }"
          class="px-6 py-3 bg-black/30 border border-purple-400/30 rounded-lg text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 font-bold no-underline"
        >
          ← Back to List
        </RouterLink>
      </div>

      <RouterView :organizer="organizer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Organizer } from '@/types/Organizer'
import { useOrganizerStore } from '@/stores/organizer'

defineProps<{
  id: string
}>()

const organizerStore = useOrganizerStore()
const organizer = ref<Organizer | null>(null)

onMounted(() => {
  organizer.value = organizerStore.organizer
})
</script>

