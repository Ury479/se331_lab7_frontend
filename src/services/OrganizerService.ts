import axios from 'axios'
import type { Organizer } from '@/types/Organizer'

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(perPage: number, page: number) {
    return apiClient.get<Organizer[]>(`/organizers?_limit=${perPage}&_page=${page}&_sort=id&_order=asc`)
  },

  getOrganizersByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get<Organizer[]>(
      `/organizers?name=${keyword}&_limit=${perPage}&_page=${page}&_sort=id&_order=asc`
    )
  },

  getOrganizer(id: number) {
    return apiClient.get<Organizer>(`/organizers/${id}`)
  },

  saveOrganizer(organizer: Organizer) {
    return apiClient.post<Organizer>('/organizers', organizer)
  },

  updateOrganizer(id: number, organizer: Organizer) {
    return apiClient.put<Organizer>(`/organizers/${id}`, organizer)
  },

  deleteOrganizer(id: number) {
    return apiClient.delete(`/organizers/${id}`)
  }
}

