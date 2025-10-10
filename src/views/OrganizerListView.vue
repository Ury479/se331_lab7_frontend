<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-hexagon-pattern opacity-20"></div>

    <div class="relative z-10">
      <div class="text-center py-12 animate-fade-in-up">
        <h1
          class="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl"
        >
          ORGANIZERS
        </h1>
        <div class="w-32 h-1 bg-gradient-to-r from-indigo-400 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div class="mb-8 flex justify-center">
        <div class="w-64">
          <BaseInput v-model="keyword" label="Search organizers..." type="text" @input="updateKeyword" />
        </div>
      </div>

      <div v-if="keyword" class="mb-4 text-center">
        <div class="inline-block bg-indigo-400/20 border border-indigo-400/50 rounded-lg px-4 py-2">
          <span class="text-indigo-300">Searching for: </span>
          <span class="text-indigo-100 font-bold">"{{ keyword }}"</span>
          <span class="text-indigo-300 ml-2">({{ totalOrganizers }} results)</span>
        </div>
      </div>

      <div class="mb-8 flex justify-center">
        <div class="bg-black/30 backdrop-blur-sm border border-indigo-400/30 rounded-lg p-4">
          <label class="text-indigo-300 font-medium text-lg">
            Page size:
            <select
              v-model.number="perPageLocal"
              class="ml-3 px-4 py-2 bg-gray-800 border border-indigo-400/50 rounded-md text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="6">6</option>
              <option :value="10">10</option>
            </select>
            <span class="ml-2 text-purple-300">organizers per page</span>
          </label>
        </div>
      </div>

      <div v-if="organizers && organizers.length > 0" class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="organizer in organizers" :key="organizer.id" class="organizer-item">
            <OrganizerCard :organizer="organizer" />
          </div>
        </div>
      </div>

      <div v-else-if="organizers === null" class="text-center py-16">
        <div class="inline-block">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-400 border-t-transparent mx-auto"></div>
          <p class="mt-6 text-indigo-300 text-xl font-medium">Loading organizers...</p>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-gray-400 text-xl">No organizers found.</p>
      </div>

      <div class="flex justify-center mt-12 pb-8">
        <div class="bg-black/40 backdrop-blur-sm border border-indigo-400/30 rounded-2xl p-6 shadow-2xl">
          <div class="text-center mb-6">
            <div class="text-indigo-300 text-lg font-bold mb-2">
              Page {{ page }} of {{ Math.ceil(totalOrganizers / perPageLocal) || 1 }}
            </div>
            <div class="text-gray-400 text-sm">
              Showing {{ organizers?.length || 0 }} of {{ totalOrganizers }} organizers
            </div>
          </div>

          <div class="flex items-center justify-center space-x-4">
            <RouterLink
              v-if="page > 1"
              :to="{ name: 'organizer-list-view', query: { page: page - 1, perPage: perPageLocal, keyword: keyword || undefined } }"
              class="px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/50 rounded-xl text-indigo-300 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 no-underline font-bold"
            >
              ← Previous
            </RouterLink>

            <div class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold rounded-xl">
              {{ page }}
            </div>

            <RouterLink
              v-if="hasNextPage"
              :to="{ name: 'organizer-list-view', query: { page: page + 1, perPage: perPageLocal, keyword: keyword || undefined } }"
              class="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-400/50 rounded-xl text-pink-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 no-underline font-bold"
            >
              Next →
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'
import type { Organizer } from '@/types/Organizer'
import { ref, computed, watch, onMounted } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

interface Props {
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const router = useRouter()
const route = useRoute()
const organizers = ref<Organizer[] | null>(null)
const totalOrganizers = ref(0)
const perPageLocal = ref(Number(route.query.perPage) || 6)
const page = computed(() => props.page || Number(route.query.page) || 1)
const keyword = ref(String(route.query.keyword || ''))
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / perPageLocal.value)
  return page.value < totalPages
})

function updateKeyword() {
  const queryFunction = keyword.value === ''
    ? OrganizerService.getOrganizers(perPageLocal.value, page.value)
    : OrganizerService.getOrganizersByKeyword(keyword.value, perPageLocal.value, page.value)

  queryFunction
    .then((response) => {
      organizers.value = response.data
      const totalCount = response.headers['x-total-count'] || response.headers['X-Total-Count'] || '0'
      totalOrganizers.value = parseInt(totalCount)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = String(newKeyword || '')
})

watch(keyword, () => {
  router.push({ name: 'organizer-list-view', query: { page: 1, perPage: perPageLocal.value, keyword: keyword.value || undefined } })
})

watch(perPageLocal, (newVal) => {
  router.push({ name: 'organizer-list-view', query: { page: 1, perPage: newVal, keyword: keyword.value || undefined } })
})

watch(() => route.path, () => {
  if (route.name === 'organizer-list-view') {
    updateKeyword()
  }
})

onMounted(() => {
  updateKeyword()
})
</script>

<style scoped>
.organizer-item {
  transition: all 0.3s ease;
}

.organizer-item:hover {
  transform: translateY(-5px);
}
</style>

