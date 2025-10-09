import axios from 'axios';
import { type Event } from '@/types';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log('EventService baseURL:', baseURL);

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get<Event[]>(`/events?_limit=${perPage}&_page=${page}&_sort=id&_order=asc`);
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get<Event[]>(`/events?title=${keyword}&_limit=${perPage}&_page=${page}&_sort=id&_order=asc`)
  },
  getEvent(id: number) {
    return apiClient.get<Event>('/events/' + id);
  },
  getAllEventIds() {
    return apiClient.get<Event[]>('/events');
  },
  saveEvent(event: Event) {
    return apiClient.post<Event>('/events', event);
  },
  updateEvent(id: number, event: Event) {
    return apiClient.put<Event>('/events/' + id, event);
  },
  deleteEvent(id: number) {
    return apiClient.delete('/events/' + id);
  },
};
