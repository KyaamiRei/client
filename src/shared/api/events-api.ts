import { http } from "./http";
import type { CreateEventRequest, EventDTO, JoinEventResponse } from "./types";

export const eventsApi = {
  async list(): Promise<EventDTO[]> {
    const { data } = await http.get<EventDTO[]>("/events");
    return data;
  },

  async getById(id: string): Promise<EventDTO> {
    const { data } = await http.get<EventDTO>(`/events/${id}`);
    return data;
  },

  async create(request: CreateEventRequest): Promise<EventDTO> {
    const { data } = await http.post<EventDTO>("/events", request);
    return data;
  },

  async update(id: string, payload: Partial<EventDTO>): Promise<EventDTO> {
    const { data } = await http.patch<EventDTO>(`/events/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await http.delete(`/events/${id}`);
  },

  async join(eventId: string): Promise<JoinEventResponse> {
    const { data } = await http.post<JoinEventResponse>(
      `/events/${eventId}/join`,
    );
    return data;
  },

  async leave(eventId: string): Promise<void> {
    await http.delete(`/events/${eventId}/join`);
  },
};
