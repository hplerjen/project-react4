import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, QueryConstraint, updateDoc,} from "firebase/firestore";
import { EventMini } from "../model/eventMini";
import { RootStore } from "../state/root-store";
import { Severity } from "../model/message";

export class EventService {
  private collectionName = "eventMini";

  public constructor(private rootStore: RootStore, protected db: Firestore) {   
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<EventMini, EventMini>; 
  }

  //FIXEME NOT YET USED
  async collectionQuery(...queryConstraints: QueryConstraint[]) {
    const baseCollection = this.collection;
    return await query<EventMini, EventMini>(
        baseCollection,
        ...queryConstraints
    );
  }

  async doc(id: string) {
    return await doc<EventMini, EventMini> (this.collection, `${id}`);
  }

  async getDoc(id: string): Promise<EventMini | undefined> {
    const docRef = await this.doc(id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();

  }

  async add(event: EventMini) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const docRef =  await addDoc(this.collection, event as DocumentData)
      .then(() => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: "Event created",
          severity: Severity.success,
        });
      })
      .catch((error: Error) => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: error.message,
          severity: Severity.error,
        });
      });
    await this.getDocs();
  }

  async update(event: EventMini) {
    const docRef = await this.doc(event.id!);
    await updateDoc(docRef, event as DocumentData)
    .then(() => {
      this.rootStore.messageStore.setMessage({
        show: true,
        text: "Event updated",
        severity: Severity.success,
      });
    })
    .catch((error: Error) => {
      this.rootStore.messageStore.setMessage({
        show: true,
        text: error.message,
        severity: Severity.error,
      });
    });
    await this.getDocs();
  }

  async remove(id: string) {
    const docRef : DocumentReference<EventMini, EventMini> = await this.doc(id);
    await deleteDoc(docRef)
    await this.getDocs()
    .then(() => {
      this.rootStore.messageStore.setMessage({
        show: true,
        text: "Event deleted",
        severity: Severity.success,
      });
    })
    .catch((error: Error) => {
      this.rootStore.messageStore.setMessage({
        show: true,
        text: error.message,
        severity: Severity.error,
      });
    });
  }

  async getDocs(){
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => (
      new EventMini({ ...doc.data(), id: doc.id})));
    this.rootStore.eventStore.add(events);
} 
}
