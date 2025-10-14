<script setup lang="ts">
interface ErrorMessageProps {
  id: string
}

defineProps<ErrorMessageProps>()
</script>

<template>
  <p
    aria-live="assertive"
    class="errorMessage"
    :id="id"
  >
    <slot />
  </p>
</template>

<style scoped>
.errorMessage {
  @apply text-sm text-red-600 mt-1;
}
</style>

