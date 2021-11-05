import { jsonEvent, JSONEventType } from '@eventstore/db-client';

export interface User {
  userId: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export type UserCreatedEvent = JSONEventType<
  'user-created',
  {
    userId: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  }
>;

export type UserUpdatedEvent = JSONEventType<
  'user-updated',
  {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  }
>;

export type UserDeletedEvent = JSONEventType<
  'user-deleted',
  {
    userId: string;
  }
>;

export type UserEvents = UserCreatedEvent | UserUpdatedEvent;
