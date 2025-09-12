<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import EventService from '@/services/EventService'

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

const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  EventService.saveEvent(event.value)
    .then(() => {
      router.push({ name: 'event-list-view' })
      store.updateMessage('You are successfully add a new event for ' + event.value.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

// 开发环境检测
const isDev = import.meta.env.DEV
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-circuit-pattern opacity-25"></div>

    <div class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
      <div class="w-full max-w-3xl">
        <!-- 标题 -->
        <div class="text-center mb-12">
          <h1 class="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
            EVENT FORM
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- 表单容器 -->
        <div class="bg-black/40 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-10 shadow-2xl shadow-purple-400/20">
          <form @submit.prevent="saveEvent" class="space-y-8">
            <!-- Category -->
            <div>
              <label class="block text-cyan-400 text-xl font-bold mb-4">Category</label>
              <input
                v-model="event.category"
                type="text"
                placeholder="Enter event category"
                class="w-full px-6 py-4 bg-gray-800/60 border-2 border-cyan-400/50 rounded-xl text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 text-lg"
              />
            </div>

            <!-- Title & Description Section -->
            <div>
              <h3 class="text-3xl font-bold text-purple-400 mb-8">Name & describe your event</h3>

              <!-- Title -->
              <div class="mb-8">
                <label class="block text-purple-400 text-xl font-bold mb-4">Title</label>
                <input
                  v-model="event.title"
                  type="text"
                  placeholder="Enter event title"
                  class="w-full px-6 py-4 bg-gray-800/60 border-2 border-purple-400/50 rounded-xl text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400 transition-all duration-300 text-lg"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-purple-400 text-xl font-bold mb-4">Description</label>
                <textarea
                  v-model="event.description"
                  placeholder="Enter detailed event description"
                  rows="5"
                  class="w-full px-6 py-4 bg-gray-800/60 border-2 border-purple-400/50 rounded-xl text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400 transition-all duration-300 resize-none text-lg"
                ></textarea>
              </div>
            </div>

            <!-- Location Section -->
            <div>
              <h3 class="text-3xl font-bold text-cyan-400 mb-8">Where is your event?</h3>

              <!-- Location -->
              <div>
                <label class="block text-cyan-400 text-xl font-bold mb-4">Location</label>
                <input
                  v-model="event.location"
                  type="text"
                  placeholder="Enter event location"
                  class="w-full px-6 py-4 bg-gray-800/60 border-2 border-cyan-400/50 rounded-xl text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 text-lg"
                />
              </div>
            </div>

            <!-- Date & Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label class="block text-cyan-400 text-xl font-bold mb-4">Date</label>
                <input
                  v-model="event.date"
                  type="date"
                  class="w-full px-6 py-4 bg-gray-800/60 border-2 border-cyan-400/50 rounded-xl text-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 text-lg"
                />
              </div>
              <div>
                <label class="block text-purple-400 text-xl font-bold mb-4">Time</label>
                <input
                  v-model="event.time"
                  type="time"
                  class="w-full px-6 py-4 bg-gray-800/60 border-2 border-purple-400/50 rounded-xl text-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400 transition-all duration-300 text-lg"
                />
              </div>
            </div>

            <!-- Organizer -->
            <div>
              <label class="block text-cyan-400 text-xl font-bold mb-4">Organizer</label>
              <input
                v-model="event.organizer"
                type="text"
                placeholder="Enter organizer name"
                class="w-full px-6 py-4 bg-gray-800/60 border-2 border-cyan-400/50 rounded-xl text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 text-lg"
              />
            </div>

            <!-- Pets Allowed Toggle -->
            <div class="flex items-center justify-between bg-gray-800/30 rounded-xl p-6 border border-purple-400/30">
              <label class="text-purple-400 text-xl font-bold">PETS ALLOWED</label>
              <div class="relative">
                <input
                  v-model="event.petsAllowed"
                  type="checkbox"
                  id="petsAllowedForm"
                  class="sr-only"
                />
                <label
                  for="petsAllowedForm"
                  class="flex items-center cursor-pointer"
                >
                  <div class="relative">
                    <div class="w-16 h-8 bg-gray-600 rounded-full shadow-inner transition-colors duration-300"
                         :class="event.petsAllowed ? 'bg-purple-500' : 'bg-gray-600'">
                    </div>
                    <div class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300"
                         :class="event.petsAllowed ? 'translate-x-8' : 'translate-x-0'">
                    </div>
                  </div>
                  <span class="ml-4 text-white font-bold text-lg" :class="event.petsAllowed ? 'text-purple-300' : 'text-gray-400'">
                    {{ event.petsAllowed ? 'ON' : 'OFF' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="text-center pt-8">
              <button
                type="submit"
                class="px-16 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white font-bold text-xl rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-400/30"
              >
                SUBMIT EVENT
              </button>
            </div>
          </form>
        </div>

        <!-- Debug Info (仅在开发环境显示) -->
        <div v-if="isDev" class="mt-8 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6">
          <h3 class="text-gray-400 text-lg font-bold mb-4">Debug Info:</h3>
          <pre class="text-sm text-gray-500 overflow-auto bg-gray-900/50 p-4 rounded-lg">{{ JSON.stringify(event, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
