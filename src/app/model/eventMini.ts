export class EventDto  {
  id?: string
  title: string
  description: string

  constructor(event : EventDto) {
    this.id = event.id
    this.title = event.title
    this.description = event.description
  }
}
