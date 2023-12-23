import { Timestamp } from "firebase/firestore"

export class EventMini {
  id?: string
  title: string
  description: string
  dateFrom: Timestamp 
  dateTo:  Timestamp 


  constructor(event : EventMini) {
    this.id = event.id
    this.title = event.title
    this.description = event.description
    this.dateFrom = event.dateFrom
    this.dateTo = event.dateTo
  }
}


