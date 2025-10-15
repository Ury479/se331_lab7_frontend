<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface Props {
  modelValue?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const convertStringToMedia = (str: string[]): any => {
  return str.map((element: string) => {
    return {
      name: element
    }
  })
}

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const convertMediaToString = (media: any): string[] => {
  const output: string[] = []
  media.forEach((element: any) => {
    output.push(element.name)
  })
  return output
}

const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8080/uploadImage')

// Authorization header from pinia store
const authStore = useAuthStore()
const authorizeHeader = computed(() => {
  return { authorization: authStore.authorizationHeader }
})

const onChanged = (files: any) => {
  emit('update:modelValue', convertMediaToString(files))
}
</script>

<template>
  <Uploader :server="uploadUrl" @change="onChanged" :media="media" :headers="authorizeHeader"></Uploader>
</template>


