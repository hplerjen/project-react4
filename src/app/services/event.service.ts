import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDocs, query, QueryConstraint, updateDoc,} from "firebase/firestore";
import { EventDto } from "../model/eventMini";
import { RootStore } from "../state/root-store";

export class EventService {
  private collectionName = "events2";

  public constructor(private rootStore: RootStore, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<EventDto, EventDto>; 
  }

  async collectionQuery(...queryConstraints: QueryConstraint[]) {
    const baseCollection = this.collection;
    return await query<EventDto, EventDto>(
        baseCollection,
        ...queryConstraints
    );
  }

  async getDoc(id: string) {
    return await doc<EventDto, EventDto> (this.collection, `${id}`);
  }

  async add(event: EventDto) {
    return await addDoc(this.collection, event as DocumentData);
  }

  async update(event: EventDto) {
    const doc = await this.getDoc(event.id!);
    return await updateDoc(doc, event as DocumentData);
  }

  async remove(id: string) {
    await deleteDoc(await this.getDoc(id));
  }

  async getDocs(){
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => (new EventDto({id: doc.id, ...doc.data()})));
    this.rootStore.eventStore.add(events);
} 
}
