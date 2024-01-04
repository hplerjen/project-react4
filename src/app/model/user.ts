export class User  {
    id?: string
    displayName: string
    email : string
    pwd: string
    isAnonymous : boolean
  
    //REM - don't change - this structure is required by firebase
    constructor(user : User) {
      this.id = user.id
      this.displayName = user.displayName
      this.isAnonymous = user.isAnonymous
      this.email = user.email
      this.pwd = user.pwd
  }
}
