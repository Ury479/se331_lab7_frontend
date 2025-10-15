<script setup lang="ts">
interface ErrorMessageProps {
  id: string
}

defineProps<ErrorMessageProps>()
</script>

<template>
  <p
    aria-live="assertive"
    class="text-sm text-red-600 mt-1"
    :id="id"
  >
    <slot />
  </p>
</template>

