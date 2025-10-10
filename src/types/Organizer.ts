export interface Organizer {
  id: number
  name: string
  description: string
  email: string
  phone?: string
  website?: string
  address?: string
  image?: string
}

export interface OrganizerState {
  organizer: Organizer | null
}

