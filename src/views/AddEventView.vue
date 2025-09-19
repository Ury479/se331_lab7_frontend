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

// 转换数据格式以匹配后端期望的字段名
function prepareEventData(eventData: Event) {
  const { petsAllowed, ...rest } = eventData
  return {
    ...rest,
    petAllowed: petsAllowed // 后端期望 petAllowed 而不是 petsAllowed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any // 临时使用 any 类型避免类型检查问题
}

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const router = useRouter()
const store = useMessageStore()

function validateForm() {
  errors.value = {}

  if (!event.value.category.trim()) {
    errors.value.category = 'Category is required'
  }
  if (!event.value.title.trim()) {
    errors.value.title = 'Title is required'
  }
  if (!event.value.description.trim()) {
    errors.value.description = 'Description is required'
  }
  if (!event.value.location.trim()) {
    errors.value.location = 'Location is required'
  }
  if (!event.value.date) {
    errors.value.date = 'Date is required'
  }
  if (!event.value.time) {
    errors.value.time = 'Time is required'
  }
  if (!event.value.organizer.trim()) {
    errors.value.organizer = 'Organizer is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errors.value = {}

  console.log('Submitting event:', event.value)

  const eventData = prepareEventData(event.value)
  console.log('Prepared event data:', eventData)

  EventService.saveEvent(eventData)
    .then((response) => {
      console.log('Event saved successfully:', response.data)
      router.push({ name: 'event-list-view' })
      store.updateMessage('You are successfully add a new event for ' + event.value.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch((error) => {
      console.error('Error saving event:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      isSubmitting.value = false
    })
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
              <label class="block text-cyan-400 text-lg font-medium mb-3">Category *</label>
              <div class="relative">
                <input
                  v-model="event.category"
                  type="text"
                  placeholder="Enter event category"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                    errors.category ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-cyan-400/50 focus:ring-cyan-400 focus:border-transparent'
                  ]"
                />
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  ▼
                </div>
              </div>
              <p v-if="errors.category" class="text-red-400 text-sm mt-2">{{ errors.category }}</p>
            </div>

            <!-- Title & Description Section -->
            <div>
              <h3 class="text-2xl font-bold text-purple-400 mb-6">Name & describe your event</h3>

              <!-- Title -->
              <div class="mb-6">
                <label class="block text-purple-400 text-lg font-medium mb-3">Title *</label>
                <input
                  v-model="event.title"
                  type="text"
                  placeholder="Enter event title"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                    errors.title ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-purple-400/50 focus:ring-purple-400 focus:border-transparent'
                  ]"
                />
                <p v-if="errors.title" class="text-red-400 text-sm mt-2">{{ errors.title }}</p>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-purple-400 text-lg font-medium mb-3">Description *</label>
                <textarea
                  v-model="event.description"
                  placeholder="Enter event description"
                  rows="4"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-purple-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none',
                    errors.description ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-purple-400/50 focus:ring-purple-400 focus:border-transparent'
                  ]"
                ></textarea>
                <p v-if="errors.description" class="text-red-400 text-sm mt-2">{{ errors.description }}</p>
              </div>
            </div>

            <!-- Location Section -->
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-6">Where is your event?</h3>

              <!-- Location -->
              <div>
                <label class="block text-cyan-400 text-lg font-medium mb-3">Location *</label>
                <input
                  v-model="event.location"
                  type="text"
                  placeholder="Enter event location"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                    errors.location ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-cyan-400/50 focus:ring-cyan-400 focus:border-transparent'
                  ]"
                />
                <p v-if="errors.location" class="text-red-400 text-sm mt-2">{{ errors.location }}</p>
              </div>
            </div>

            <!-- Date & Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-cyan-400 text-lg font-medium mb-3">Date *</label>
                <input
                  v-model="event.date"
                  type="date"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-cyan-300 focus:outline-none focus:ring-2 transition-all duration-300',
                    errors.date ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-cyan-400/50 focus:ring-cyan-400 focus:border-transparent'
                  ]"
                />
                <p v-if="errors.date" class="text-red-400 text-sm mt-2">{{ errors.date }}</p>
              </div>
              <div>
                <label class="block text-purple-400 text-lg font-medium mb-3">Time *</label>
                <input
                  v-model="event.time"
                  type="time"
                  :class="[
                    'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-purple-300 focus:outline-none focus:ring-2 transition-all duration-300',
                    errors.time ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-purple-400/50 focus:ring-purple-400 focus:border-transparent'
                  ]"
                />
                <p v-if="errors.time" class="text-red-400 text-sm mt-2">{{ errors.time }}</p>
              </div>
            </div>

            <!-- Organizer -->
            <div>
              <label class="block text-cyan-400 text-lg font-medium mb-3">Organizer *</label>
              <input
                v-model="event.organizer"
                type="text"
                placeholder="Enter organizer name"
                :class="[
                  'w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                  errors.organizer ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-cyan-400/50 focus:ring-cyan-400 focus:border-transparent'
                ]"
              />
              <p v-if="errors.organizer" class="text-red-400 text-sm mt-2">{{ errors.organizer }}</p>
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
                :disabled="isSubmitting"
                :class="[
                  'px-12 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg',
                  isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 transform hover:scale-105 hover:shadow-2xl'
                ]"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBMITTING...
                </span>
                <span v-else>SUBMIT</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Debug Info (仅在开发环境显示) -->
        <div v-if="isDev" class="mt-8 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4">
          <h3 class="text-gray-400 text-sm font-medium mb-2">Debug Info:</h3>
          <pre class="text-xs text-gray-500 overflow-auto">{{ JSON.stringify(event, null, 2) }}</pre>
          <div class="mt-4">
            <h4 class="text-gray-400 text-sm font-medium mb-2">Form Status:</h4>
            <p class="text-xs text-gray-500">Is Submitting: {{ isSubmitting }}</p>
            <p class="text-xs text-gray-500">Errors: {{ Object.keys(errors).length > 0 ? JSON.stringify(errors, null, 2) : 'None' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
