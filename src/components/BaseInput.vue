<template>
  <div class="w-full">
    <label v-if="label" class="block mb-2 text-cyan-300">{{ label }}</label>
    <input
      :type="type"
      class="w-full px-4 py-2 rounded-md bg-gray-800 border border-cyan-400/50 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      :value="modelValue"
      @input="onInput"
    />
  </div>
  </template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  modelValue: string | number
  label?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<style scoped>
</style>


