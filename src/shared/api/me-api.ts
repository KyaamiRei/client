import { http } from "./http";
import type { JoinedEventItem } from "./types";

export const meApi = {
  async joinedEvents(): Promise<JoinedEventItem[]> {
    const {data} = await http.get<JoinedEventItem[]>("/me/event/joined");
    return data;
  },
};