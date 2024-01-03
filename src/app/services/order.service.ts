import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, updateDoc,} from "firebase/firestore";
import { RootStore } from "../store/root-store";
import { OrderMini } from "../model/orderMini";

export class OrderService {
  private collectionName = "ordersMini";

  public constructor(private rootStore: RootStore, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<OrderMini, OrderMini>; 
  }

  async doc(id: string) {
    return await doc<OrderMini, OrderMini> (this.collection, `${id}`);
  }

  async getDoc(id: string): Promise<OrderMini | undefined> {
    const docRef = await this.doc(id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async add(order: OrderMini) {
    await addDoc(this.collection, order as DocumentData);
    await this.getDocs();
  }

  async update(order: OrderMini) {
    const docRef = await this.doc(order.id!);
    await updateDoc(docRef, order as DocumentData);
    await this.getDocs();
  }

  async remove(id: string) {
    const docRef : DocumentReference<OrderMini, OrderMini> = await this.doc(id);
    await deleteDoc(docRef);
    await this.getDocs();
  }

  async getDocs(){
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => (
      new OrderMini({ ...doc.data(), id: doc.id})));
    this.rootStore.ordersStore.add(orders);
} 
}
