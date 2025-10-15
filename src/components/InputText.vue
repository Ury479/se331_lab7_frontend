<script setup lang="ts">
import UniqueID from '@/features/UniqueID'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const modelValue = defineModel<string>()

interface Props {
  label?: string
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  error: '',
  required: false,
  type: 'text'
})

const uuid = UniqueID().getID()
const placeholderErrorClass = computed(() => ({
  'border-red-300 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:ring-red-500': !!props.error,
  'border-gray-300 focus:border-indigo-600 focus:ring-indigo-600': !props.error
}))

const isError = computed(() => !!props.error)
</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <input
      :id="uuid"
      :type="type"
      :name="uuid"
      v-model="modelValue"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="isError ? 'true' : 'false'"
      :aria-describedby="isError ? `${uuid}-error` : undefined"
      :class="[placeholderErrorClass, $attrs.class]"
      class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
    />
    <div
      v-if="error"
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
    >
      <svg
        class="h-5 w-5 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
  <ErrorMessage
    v-if="error"
    class="inline-flex text-sm text-red-700 mt-2"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </ErrorMessage>
</template>

