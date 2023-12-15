export class User  {
    id?: string
    displayName: string
    email : string
    pwd: string
    isAnonymous : boolean
  
    //REM 
    constructor(user : User) {
      this.id = user.id
      this.displayName = user.displayName
      this.isAnonymous = user.isAnonymous
      this.email = user.email
      this.pwd = user.pwd
  }
}
