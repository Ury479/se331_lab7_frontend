<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create New Organizer
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div class="bg-black/40 backdrop-blur-sm border border-indigo-400/30 rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label class="block text-indigo-300 font-medium mb-2">
              Organizer Name <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter organizer name"
              class="w-full px-4 py-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label class="block text-indigo-300 font-medium mb-2">
              Description <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="formData.description"
              required
              rows="4"
              placeholder="Describe the organizer..."
              class="w-full px-4 py-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-indigo-300 font-medium mb-2">
              Email <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="organizer@example.com"
              class="w-full px-4 py-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label class="block text-purple-300 font-medium mb-2">Phone</label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="+1 234 567 8900"
              class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label class="block text-purple-300 font-medium mb-2">Website</label>
            <input
              v-model="formData.website"
              type="url"
              placeholder="https://example.com"
              class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label class="block text-purple-300 font-medium mb-2">Address</label>
            <input
              v-model="formData.address"
              type="text"
              placeholder="123 Main St, City, Country"
              class="w-full px-4 py-3 bg-gray-800/50 border border-purple-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label class="block text-pink-300 font-medium mb-2">
              Profile Image URL
              <span class="text-sm text-gray-400 ml-2">(Only 1 image allowed)</span>
            </label>
            <input
              v-model="formData.image"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-3 bg-gray-800/50 border border-pink-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <div v-if="formData.image" class="mt-4">
              <p class="text-sm text-gray-400 mb-2">Image Preview:</p>
              <div class="rounded-lg overflow-hidden border border-pink-400/30 max-w-md">
                <img
                  :src="formData.image"
                  alt="Preview"
                  class="w-full h-48 object-cover"
                  @error="imageError = true"
                />
              </div>
              <p v-if="imageError" class="text-red-400 text-sm mt-2">
                ⚠️ Failed to load image. Please check the URL.
              </p>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">✨ Create Organizer</span>
              <span v-else>⏳ Creating...</span>
            </button>

            <button
              type="button"
              @click="router.push({ name: 'organizer-list-view' })"
              class="px-6 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import { useMessageStore } from '@/stores/message'

const router = useRouter()
const messageStore = useMessageStore()

const formData = ref({
  name: '',
  description: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  image: ''
})

const isSubmitting = ref(false)
const imageError = ref(false)

async function submitForm() {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    const organizerData: any = {
      name: formData.value.name,
      description: formData.value.description,
      email: formData.value.email
    }

    if (formData.value.phone) organizerData.phone = formData.value.phone
    if (formData.value.website) organizerData.website = formData.value.website
    if (formData.value.address) organizerData.address = formData.value.address
    if (formData.value.image) organizerData.image = formData.value.image

    const response = await OrganizerService.saveOrganizer(organizerData)

    messageStore.updateMessage(`Successfully created organizer: ${response.data.name}`)

    setTimeout(() => {
      messageStore.resetMessage()
      router.push({
        name: 'organizer-detail-view',
        params: { id: response.data.id }
      })
    }, 1000)
  } catch (error: any) {
    console.error('Error creating organizer:', error)

    let errorMessage = 'Failed to create organizer. '

    if (error.response?.status === 400) {
      errorMessage += 'Bad request - please check your input data.'
    } else if (error.response?.status === 404) {
      errorMessage += 'API endpoint not found - backend may not be configured.'
    } else if (!error.response) {
      errorMessage += 'Cannot connect to server - please check if backend is running.'
    }

    alert(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

watch(() => formData.value.image, () => {
  imageError.value = false
})
</script>

