export class AddressMini {
  id?: string;
  uid: string;
  firstName: string;
  surName: string;
  plz: number;
  location: string;

  constructor(address: AddressMini) {
    this.id = address.id;
    this.uid = address.uid;
    this.firstName = address.firstName;
    this.surName = address.surName;
    this.plz = address.plz;
    this.location = address.location;
  }
}
