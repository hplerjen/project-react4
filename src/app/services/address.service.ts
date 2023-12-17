import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, QueryConstraint, updateDoc, where,} from "firebase/firestore";
import { AddressMini } from "../model/addressMini";
import { RootStore } from "../state/root-store";
import { Severity } from "../model/message";

export class AddressService {
  private collectionName = "addressMini";

  public constructor(private rootStore: RootStore, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<AddressMini, AddressMini>; 
  }


  existsAdressForCurrentUser () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = this.collectionQuery(
      where("uid", "==", this.rootStore.authStore.currentUser?.uid),
    ).then((address) => {
       //this.rootStore.orderStore.currentOrder?.addAddress;
    })
  }

  async collectionQuery(...queryConstraints: QueryConstraint[]) {
    const baseCollection = this.collection;
    return await query<AddressMini, AddressMini>(
        baseCollection,
        ...queryConstraints
    );
  }

  async doc(id: string) {
    return await doc<AddressMini, AddressMini> (this.collection, `${id}`);
  }

  async getDoc(id: string): Promise<AddressMini | undefined> {
    const docRef = await this.doc(id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async add(address: AddressMini) {
    await addDoc(this.collection, address as DocumentData);
    this.rootStore.messageStore.setMessage({
      text: "Address successfully created",
      severity: Severity.success})
  }

  async update(event: AddressMini) {
    const docRef = await this.doc(event.id!);
    await updateDoc(docRef, event as DocumentData);
  }


}
