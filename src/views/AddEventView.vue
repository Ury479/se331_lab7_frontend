<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
})

const handleSubmit = () => {
  console.log('Event submitted:', event.value)
  // 这里可以添加提交逻辑
}

// 开发环境检测
const isDev = import.meta.env.DEV
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-hexagon-pattern opacity-20"></div>

    <div class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
      <div class="w-full max-w-2xl">
        <!-- 标题 -->
        <div class="text-center mb-12">
          <h1 class="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
            CREATE AN EVENT
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- 表单容器 -->
        <div class="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 shadow-2xl shadow-cyan-400/20">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Category -->
            <div>
              <label class="block text-cyan-400 text-lg font-medium mb-3">Category</label>
              <div class="relative">
                <input
                  v-model="event.category"
                  type="text"
                  placeholder="Enter event category"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/50 rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  ▼
                </div>
              </div>
            </div>

            <!-- Title & Description Section -->
            <div>
              <h3 class="text-2xl font-bold text-purple-400 mb-6">Name & describe your event</h3>

              <!-- Title -->
              <div class="mb-6">
                <label class="block text-purple-400 text-lg font-medium mb-3">Title</label>
                <input
                  v-model="event.title"
                  type="text"
                  placeholder="Enter event title"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/50 rounded-lg text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-purple-400 text-lg font-medium mb-3">Description</label>
                <textarea
                  v-model="event.description"
                  placeholder="Enter event description"
                  rows="4"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/50 rounded-lg text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Location Section -->
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-6">Where is your event?</h3>

              <!-- Location -->
              <div>
                <label class="block text-cyan-400 text-lg font-medium mb-3">Location</label>
                <input
                  v-model="event.location"
                  type="text"
                  placeholder="Enter event location"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/50 rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <!-- Date & Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-cyan-400 text-lg font-medium mb-3">Date</label>
                <input
                  v-model="event.date"
                  type="date"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/50 rounded-lg text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-purple-400 text-lg font-medium mb-3">Time</label>
                <input
                  v-model="event.time"
                  type="time"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/50 rounded-lg text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <!-- Organizer -->
            <div>
              <label class="block text-cyan-400 text-lg font-medium mb-3">Organizer</label>
              <input
                v-model="event.organizer"
                type="text"
                placeholder="Enter organizer name"
                class="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/50 rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            <!-- Pets Allowed Toggle -->
            <div class="flex items-center justify-between">
              <label class="text-purple-400 text-lg font-medium">PETS ALLOWED</label>
              <div class="relative">
                <input
                  v-model="event.petsAllowed"
                  type="checkbox"
                  id="petsAllowed"
                  class="sr-only"
                />
                <label
                  for="petsAllowed"
                  class="flex items-center cursor-pointer"
                >
                  <div class="relative">
                    <div class="w-14 h-7 bg-gray-600 rounded-full shadow-inner transition-colors duration-300"
                         :class="event.petsAllowed ? 'bg-purple-500' : 'bg-gray-600'">
                    </div>
                    <div class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300"
                         :class="event.petsAllowed ? 'translate-x-7' : 'translate-x-0'">
                    </div>
                  </div>
                  <span class="ml-3 text-white font-medium" :class="event.petsAllowed ? 'text-purple-300' : 'text-gray-400'">
                    {{ event.petsAllowed ? 'ON' : 'OFF' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="text-center pt-6">
              <button
                type="submit"
                class="px-12 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold text-lg rounded-xl hover:from-cyan-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        <!-- Debug Info (仅在开发环境显示) -->
        <div v-if="isDev" class="mt-8 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4">
          <h3 class="text-gray-400 text-sm font-medium mb-2">Debug Info:</h3>
          <pre class="text-xs text-gray-500 overflow-auto">{{ JSON.stringify(event, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
