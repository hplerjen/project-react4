import {makeAutoObservable} from "mobx";

export interface IEventMini  {
  id?: string
  title: string
  description: string
}

export class EventMini implements IEventMini {
  id?: string
  title: string
  description: string

  constructor(event : EventMini) {
    this.id = event.id
    this.title = event.title
    this.description = event.description

    makeAutoObservable(this);
  }
}


