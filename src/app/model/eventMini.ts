export class EventMini  {
  id?: string
  title: string
  description: string

  constructor(event : EventMini) {
    this.id = event.id
    this.title = event.title
    this.description = event.description
  }
}
