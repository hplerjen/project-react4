import {makeAutoObservable} from "mobx";
import {Timestamp} from "firebase/firestore";

export interface IEventFull  {
  id?: string;
  title: string;
  description: string;
  eventType: string;
  artists: string;
  location: string;
  place: string;
  organisation: string;
  url: string;
  image: string;
  imageAltText: string;
  dateFrom: Timestamp; 
  dateTo:  Timestamp;
  createdAt?: Timestamp;
  deletedAt?: Timestamp;
}

export class EventFull implements IEventFull {
  id?: string;
  title: string;
  description: string;
  eventType: string;
  artists: string;
  location: string;
  place: string;
  organisation: string;
  url: string;
  image: string;
  imageAltText: string;
  dateFrom: Timestamp; 
  dateTo:  Timestamp; 
  createdAt?: Timestamp;
  deletedAt?: Timestamp;

  constructor(event : EventFull) {
    this.id = event.id
    this.title = event.title
    this.description = event.description
    this.eventType = event.eventType
    this.artists = event.artists
    this.location = event.location
    this.place = event.place
    this.organisation = event.organisation
    this.url = event.url
    this.image = event.image
    this.imageAltText = event.imageAltText
    this.dateFrom = event.dateFrom
    this.dateTo = event.dateTo
    this.createdAt = event.createdAt
    this.deletedAt = event.deletedAt
   
    makeAutoObservable(this);
  }
}