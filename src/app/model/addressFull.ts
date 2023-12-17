export class Address  {
    id?: string
    userid : string
    firstName: string
    surName : string
    compagnyName : string
    street: string
    nr : string
    plz: number
    location : string
    telefonNumber: string
    email: string

  
    constructor(address : Address) {
      this.id = address.id
      this.userid = address.userid
      this.firstName = address.firstName
      this.surName = address.surName
      this.compagnyName = address.compagnyName
      this.street = address.street
      this.nr = address.nr
      this.plz = address.plz
      this.location = address.location
      this.telefonNumber = address.telefonNumber
      this.email = address.email
    }
  }