import type { Organizer } from '@/types/Organizer'
import apiClient from './AxiosClient'

// If your backend exposes a prefix like /api/v1, prefer to include it here once.
// Example: const API_PREFIX = '/api/v1'
// For now we keep empty because VITE_BACKEND_URL may already contain the prefix.
const API_PREFIX = '/api/v1'

export default {
  getOrganizers(perPage: number, page: number) {
    return apiClient.get<Organizer[]>(
      `${API_PREFIX}/organizers?_limit=${perPage}&_page=${page}&_sort=id&_order=asc`
    )
  },

  getOrganizersByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get<Organizer[]>(
      `${API_PREFIX}/organizers?name=${keyword}&_limit=${perPage}&_page=${page}&_sort=id&_order=asc`
    )
  },

  getOrganizer(id: number) {
    return apiClient.get<Organizer>(`${API_PREFIX}/organizers/${id}`)
  },

  saveOrganizer(organizer: Organizer) {
    return apiClient.post<Organizer>(`${API_PREFIX}/organizers`, organizer)
  },

  updateOrganizer(id: number, organizer: Organizer) {
    return apiClient.put<Organizer>(`${API_PREFIX}/organizers/${id}`, organizer)
  },

  deleteOrganizer(id: number) {
    return apiClient.delete(`${API_PREFIX}/organizers/${id}`)
  }
}

