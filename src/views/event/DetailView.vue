<template>
  <div>
    <h2>{{ props.event.title }}</h2>
    <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
    <p>{{ props.event.description }}</p>
    <p>Category: {{ props.event.category }}</p>
    <p>Organizer: {{ props.event.organizer }}</p>
    <p>Pets Allowed: {{ props.event.petsAllowed ? 'Yes' : 'No' }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Event } from '@/types'
const props = defineProps<{ event: Event, id: string }>()
</script>
