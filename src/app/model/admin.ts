export class Admin {
  id?: string;
  uid: string;

  constructor(admin: Admin) {
    this.id = admin.id;
    this.uid = admin.uid;
  }
}
