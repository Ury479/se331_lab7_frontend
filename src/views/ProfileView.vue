<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiEmail, mdiPhone, mdiWeb, mdiMapMarker } from '@mdi/js'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
    <div class="w-full max-w-2xl">
      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-lg">
            <SvgIcon type="mdi" :path="mdiAccount" :size="48" class="text-indigo-600" />
          </div>
          <h2 class="text-3xl font-bold text-white">{{ authStore.user?.name || 'User Profile' }}</h2>
          <p class="mt-2 text-indigo-100">User Profile Information</p>
        </div>

        <!-- Profile Content -->
        <div class="px-8 py-8">
          <div v-if="authStore.user" class="space-y-6">
            <!-- User ID -->
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
                <span class="text-indigo-600 font-bold">#</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">User ID</p>
                <p class="text-lg text-gray-900">{{ authStore.user.id }}</p>
              </div>
            </div>

            <!-- Name -->
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                <SvgIcon type="mdi" :path="mdiAccount" :size="20" class="text-purple-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Name</p>
                <p class="text-lg text-gray-900">{{ authStore.user.name }}</p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <SvgIcon type="mdi" :path="mdiEmail" :size="20" class="text-blue-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Email</p>
                <p class="text-lg text-gray-900">{{ authStore.user.email }}</p>
              </div>
            </div>

            <!-- Description -->
            <div v-if="authStore.user.description" class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                <span class="text-green-600 text-xl">📝</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Description</p>
                <p class="text-lg text-gray-900">{{ authStore.user.description }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div v-if="authStore.user.phone" class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
                <SvgIcon type="mdi" :path="mdiPhone" :size="20" class="text-yellow-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Phone</p>
                <p class="text-lg text-gray-900">{{ authStore.user.phone }}</p>
              </div>
            </div>

            <!-- Website -->
            <div v-if="authStore.user.website" class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full">
                <SvgIcon type="mdi" :path="mdiWeb" :size="20" class="text-pink-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Website</p>
                <a :href="authStore.user.website" target="_blank" class="text-lg text-indigo-600 hover:underline">
                  {{ authStore.user.website }}
                </a>
              </div>
            </div>

            <!-- Address -->
            <div v-if="authStore.user.address" class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                <SvgIcon type="mdi" :path="mdiMapMarker" :size="20" class="text-red-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 font-medium">Address</p>
                <p class="text-lg text-gray-900">{{ authStore.user.address }}</p>
              </div>
            </div>
          </div>

          <!-- Not logged in -->
          <div v-else class="text-center py-8">
            <p class="text-gray-500 mb-4">Please log in to view your profile</p>
            <RouterLink
              to="/login"
              class="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Go to Login
            </RouterLink>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <div class="flex justify-center gap-4">
            <RouterLink
              to="/"
              class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

