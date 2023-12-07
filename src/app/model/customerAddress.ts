export class CustomerAddress  {
    id?: string
    userid : string
    title: string
    description : string
  
    constructor(address : CustomerAddress) {
      this.id = address.id
      this.userid = address.userid
      this.title = address.title
      this.description = address.description
    }
  }