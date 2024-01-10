import { makeAutoObservable } from 'mobx';
import { Timestamp } from 'firebase/firestore';

export enum EventType {
  workshop = 1,
  concert = 2,
  presentation = 3,
}

export function convertEventTypeFromFireStore(
  eventTypFireStore: EventType
): EventType {
  switch (eventTypFireStore) {
    case EventType.workshop: {
      return EventType.workshop;
    }
    case EventType.concert: {
      return EventType.concert;
    }
    case EventType.presentation: {
      return EventType.presentation;
    }
    default: {
      return EventType.workshop;
    }
  }
}

export function convertFireStoreToStringFormattedEventType(
  eventTypeFireStore: number
): string {
  return Object.keys(EventType)[
    Object.values(EventType).indexOf(eventTypeFireStore)
  ];
}

export interface IEvent {
  id?: string;
  title: string;
  description: string;
  eventType: EventType;
  artist: string;
  location: string;
  place: string;
  organisation: string;
  url: string;
  image: string;
  imageAltText: string;
  dateFrom: Timestamp;
  dateTo: Timestamp;
  createdAt?: Timestamp;
  //deletedAt?: Timestamp;
}

export class EventM implements IEvent {
  id?: string;
  title: string;
  description: string;
  eventType: EventType;
  artist: string;
  location: string;
  place: string;
  organisation: string;
  url: string;
  image: string;
  imageAltText: string;
  dateFrom: Timestamp;
  dateTo: Timestamp;
  createdAt: Timestamp;

  constructor(event: EventM) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.eventType = event.eventType;
    this.artist = event.artist;
    this.location = event.location;
    this.place = event.place;
    this.organisation = event.organisation;
    this.url = event.url;
    this.image = event.image;
    this.imageAltText = event.imageAltText;
    this.dateFrom = event.dateFrom;
    this.dateTo = event.dateTo;
    this.createdAt = event.createdAt;

    makeAutoObservable(this);
  }
}
