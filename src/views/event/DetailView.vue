<template>
  <div>
    <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
    <p>{{ props.event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Event } from '@/types'
const props = defineProps<{ event: Event, id: string }>()
</script> 