export class User  {
    id?: string
    displayName: string
    email : string
    pwd: string
  
    constructor(user : User) {
      this.id = user.id
      this.displayName = user.displayName
      this.email = user.email
      this.pwd = user.pwd
  }
}
