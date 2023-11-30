import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDocs, query, QueryConstraint, updateDoc,} from "firebase/firestore";
import { EventMini } from "../model/eventMini";
import { RootStore } from "../state/root-store";

export class EventService {
  private collectionName = "events2";

  public constructor(private rootStore: RootStore, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<EventMini, EventMini>; 
  }

  async collectionQuery(...queryConstraints: QueryConstraint[]) {
    const baseCollection = this.collection;
    return await query<EventMini, EventMini>(
        baseCollection,
        ...queryConstraints
    );
  }

  async getDoc(id: string) {
    return await doc<EventMini, EventMini> (this.collection, `${id}`);
  }

  async add(event: EventMini) {
    return await addDoc(this.collection, event as DocumentData);
  }

  async update(event: EventMini) {
    const doc = await this.getDoc(event.id!);
    return await updateDoc(doc, event as DocumentData);
  }

  async remove(id: string) {
    await deleteDoc(await this.getDoc(id));
  }

  async getDocs(){
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => (new EventMini({id: doc.id, ...doc.data()})));
    this.rootStore.eventStore.add(events);
} 
}
