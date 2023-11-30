export class EventDto2  {
    id?: string
    title: string
    description: string
  
    constructor(event : EventDto2) {
      this.id = event.id
      this.title = event.title
      this.description = event.description
    }
  }
  


     /*dateCreated: Date;
    dateDeleted: Date;
    dateFrom: Date;
    dateTo: Date;
    description: string;
    eventType: string;
    place: string;
    url: string;*/