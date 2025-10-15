import apiClient from './AxiosClient'
import { type Event } from '@/types'

const API_PREFIX = '/api/v1'

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get<Event[]>(`${API_PREFIX}/events`, {
      params: { _limit: perPage, _page: page, _sort: 'id', _order: 'asc' }
    })
  },

  getEventsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get<Event[]>(`${API_PREFIX}/events`, {
      params: { title: keyword, _limit: perPage, _page: page, _sort: 'id', _order: 'asc' }
    })
  },

  getEvent(id: number) {
    return apiClient.get<Event>(`${API_PREFIX}/events/${id}`)
  },

  getAllEventIds() {
    return apiClient.get<Event[]>(`${API_PREFIX}/events`)
  },

  saveEvent(event: Event) {
    return apiClient.post<Event>(`${API_PREFIX}/events`, event)
  },

  updateEvent(id: number, event: Event) {
    return apiClient.put<Event>(`${API_PREFIX}/events/${id}`, event)
  },

  deleteEvent(id: number) {
    return apiClient.delete(`${API_PREFIX}/events/${id}`)
  },
}
