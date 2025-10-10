import { defineStore } from 'pinia'
import type { OrganizerState } from '@/types/Organizer'
import type { Organizer } from '@/types/Organizer'

export const useOrganizerStore = defineStore('organizer', {
  state: (): OrganizerState => ({
    organizer: null
  }),
  actions: {
    setOrganizer(organizer: Organizer) {
      this.organizer = organizer
    },
    clearOrganizer() {
      this.organizer = null
    }
  }
})

