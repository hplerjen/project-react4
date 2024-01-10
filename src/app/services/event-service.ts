import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  updateDoc,
} from 'firebase/firestore';
import { RootStore } from '../state/root-store';
import { Severity } from '../model/message';
import { EventM } from '../model/event';

export class EventService {
  private collectionName = 'events';

  public constructor(private rootStore: RootStore, protected db: Firestore) {}

  get collection() {
    return collection(this.db, this.collectionName) as CollectionReference<
      EventM,
      EventM
    >;
  }

  //FIXME NOT YET USED
  async collectionQuery(...queryConstraints: QueryConstraint[]) {
    const baseCollection = this.collection;
    return await query<EventM, EventM>(baseCollection, ...queryConstraints);
  }

  async doc(id: string) {
    return await doc<EventM, EventM>(this.collection, `${id}`);
  }

  async getDoc(id: string): Promise<EventM | undefined> {
    const docRef = await this.doc(id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async add(event: EventM) {
    const docRef = await addDoc(this.collection, event as DocumentData);
    //REM new store id in database
    await updateDoc(docRef, { ...event, id: docRef.id } as DocumentData);
    await this.getDocs()
      .then(() => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: 'Event created',
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

  async update(event: EventM) {
    const docRef = await this.doc(event.id!);
    await updateDoc(docRef, event as DocumentData)
      .then(() => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: 'Event updated',
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
    const docRef = await this.doc(id);
    await deleteDoc(docRef);
    await this.getDocs()
      .then(() => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: 'Event deleted',
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

  async getDocs() {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(
      (doc) => new EventM({ ...doc.data(), id: doc.id })
    );
    this.rootStore.eventStore.add(events);
  }
}
