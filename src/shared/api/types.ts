import { capacity } from "./../../../.kilo/node_modules/effect/src/PartitionedSemaphore";
export type UserPublic = {
  id: string;
  email: string;
  name: string;
};

export type UserProfile = UserPublic & {
  createdAt: string;
  updatedAt: string;
};

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: UserPublic;
};

export type AuthRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type ApiFieldError = {
  path: string;
  message: string;
};

export type ApiErrorResponse = {
  message: string;
  errors?: ApiFieldError[];
};

export type EventDTO = {
  id: string;
  title: string;
  description: string;
  capacity: number;
  address: string;
  ownerId: string;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  capacity: number;
  address: string;
  startedAt: string;
};

export type UpdateEventRequest = Partial<CreateEventRequest>;

export type JoinEventResponse = {
  message: string;
  participation: {
    id: string;
    userId: string;
    eventId: string;
    joinedAt: string;
  };
};

export type JoinedEventItem = {
  joinedAt: string;
  event: EventDTO;
};
