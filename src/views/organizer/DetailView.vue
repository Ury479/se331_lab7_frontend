<template>
  <div v-if="organizer" class="animate-fade-in">
    <div class="bg-black/40 backdrop-blur-sm border border-indigo-400/30 rounded-2xl overflow-hidden shadow-2xl">
      <!-- Profile Image -->
      <div v-if="organizer.image" class="relative h-96 overflow-hidden bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <img
          :src="organizer.image"
          :alt="organizer.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full flex items-center justify-center">
              <span class="text-3xl">👤</span>
            </div>
            <div>
              <div class="text-sm text-indigo-300 font-medium">ORGANIZER #{{ organizer.id }}</div>
              <h1 class="text-4xl font-bold text-white">{{ organizer.name }}</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- No Image Header -->
      <div v-else class="bg-gradient-to-br from-indigo-600/50 to-purple-600/50 p-8">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full flex items-center justify-center">
            <span class="text-3xl">👤</span>
          </div>
          <div>
            <div class="text-sm text-indigo-200 font-medium">ORGANIZER #{{ organizer.id }}</div>
            <h1 class="text-4xl font-bold text-white">{{ organizer.name }}</h1>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="p-8 space-y-6">
        <div>
          <h2 class="text-xl font-bold text-indigo-300 mb-3 flex items-center">
            <span class="mr-2">📝</span> About
          </h2>
          <p class="text-gray-300 leading-relaxed">{{ organizer.description }}</p>
        </div>

        <!-- Contact Info -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-indigo-900/30 rounded-xl p-4 border border-indigo-400/20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                <span class="text-xl">📧</span>
              </div>
              <div>
                <div class="text-xs text-indigo-400 font-medium">EMAIL</div>
                <a
                  :href="`mailto:${organizer.email}`"
                  class="text-indigo-200 font-medium hover:text-indigo-100 transition-colors"
                >
                  {{ organizer.email }}
                </a>
              </div>
            </div>
          </div>

          <div
            v-if="organizer.phone"
            class="bg-purple-900/30 rounded-xl p-4 border border-purple-400/20"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                <span class="text-xl">📱</span>
              </div>
              <div>
                <div class="text-xs text-purple-400 font-medium">PHONE</div>
                <a
                  :href="`tel:${organizer.phone}`"
                  class="text-purple-200 font-medium hover:text-purple-100 transition-colors"
                >
                  {{ organizer.phone }}
                </a>
              </div>
            </div>
          </div>

          <div
            v-if="organizer.website"
            class="bg-pink-900/30 rounded-xl p-4 border border-pink-400/20"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-pink-500/30 rounded-lg flex items-center justify-center">
                <span class="text-xl">🌐</span>
              </div>
              <div>
                <div class="text-xs text-pink-400 font-medium">WEBSITE</div>
                <a
                  :href="organizer.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-pink-200 font-medium hover:text-pink-100 transition-colors truncate block"
                >
                  {{ organizer.website }}
                </a>
              </div>
            </div>
          </div>

          <div
            v-if="organizer.address"
            class="bg-cyan-900/30 rounded-xl p-4 border border-cyan-400/20"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                <span class="text-xl">📍</span>
              </div>
              <div>
                <div class="text-xs text-cyan-400 font-medium">ADDRESS</div>
                <p class="text-cyan-200 font-medium">{{ organizer.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 flex gap-4">
          <button
            @click="router.push({ name: 'organizer-list-view' })"
            class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
          >
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Organizer } from '@/types/Organizer'
import { useRouter } from 'vue-router'

defineProps<{
  organizer: Organizer
}>()

const router = useRouter()
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>

